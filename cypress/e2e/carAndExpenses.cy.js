import GaragePage from '../pages/GaragePage';
import ExpensesPage from '../pages/ExpensesPage';

describe('Garage and Fuel Expenses Flow', () => {
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

  it('Should add a car and record a fuel expense', () => {
    GaragePage.addCar('Audi', 'TT', '12500');
    cy.get('.car-item').should('be.visible');

    ExpensesPage.open();
    ExpensesPage.addExpense('13000', '45', '2000');
    cy.get('table').should('contain', '45');
  });
});
