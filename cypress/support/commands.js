Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('.header_signin').click();
  cy.get('#signinEmail').type(email);
  cy.get('#signinPassword').type(password, { sensitive: true });
  cy.get('.modal-footer .btn-primary').contains('Login').click();
});

Cypress.Commands.add('createExpense', (carId, payload) => {
  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    body: {
      carId,
      reportedAt: payload.reportedAt || '2026-10-25',
      mileage: payload.mileage,
      liters: payload.liters,
      totalCost: payload.totalCost,
      forceMileage: false,
    },
  });
});
