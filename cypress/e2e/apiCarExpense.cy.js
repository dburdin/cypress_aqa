import GaragePage from '../pages/GaragePage';
import ExpensesPage from '../pages/ExpensesPage';

describe('API car + expense', () => {
  const carData = {
    brand: 'Audi',
    model: 'TT',
    mileage: '12500',
  };
  const expenseData = {
    mileage: 13000,
    liters: 45,
    totalCost: 2000,
    reportedAt: '2026-10-25',
  };

  beforeEach(() => {
    cy.fixture('auth').then((auth) => {
      cy.visit('/', {
        auth: {
          username: auth.username,
          password: auth.password,
        },
      });
    });

    cy.get('.header_signin').click();

    cy.env(['login', 'password']).then(({ login, password }) => {
      cy.get('#signinEmail').type(login);
      cy.get('#signinPassword').type(password, { sensitive: true });
    });

    cy.get('.modal-footer .btn-primary').contains('Login').click();
    cy.url().should('include', '/panel/garage');
  });

  it('creates car via UI, intercepts id, validates via API, creates expense via API, checks in UI', () => {
    cy.intercept('POST', '/api/cars').as('createCar');

    GaragePage.addCar(carData.brand, carData.model, carData.mileage);

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      const createdCarId = interception.response.body.data.id;
      expect(createdCarId).to.be.a('number');

      cy.request('/api/cars').then((response) => {
        expect(response.status).to.eq(200);
        const car = response.body.data.find((c) => c.id === createdCarId);
        expect(car).to.exist;
        expect(car.brand).to.eq(carData.brand);
        expect(car.model).to.eq(carData.model);
        expect(car.mileage).to.eq(Number(carData.mileage));
      });

      cy.createExpense(createdCarId, expenseData).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('ok');
        expect(response.body.data.carId).to.eq(createdCarId);
        expect(response.body.data.mileage).to.eq(expenseData.mileage);
        expect(response.body.data.liters).to.eq(expenseData.liters);
        expect(response.body.data.totalCost).to.eq(expenseData.totalCost);
      });

      ExpensesPage.open();
      cy.contains('Audi TT').should('be.visible');
      cy.get('table').should('contain', expenseData.liters);
      cy.get('table').should('contain', expenseData.totalCost);
    });
  });
});
