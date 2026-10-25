describe('Registration', () => {
  const openRegistration = () => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
    cy.get('.hero-descriptor_btn').contains('Sign up').click();
  };

  beforeEach(() => {
    openRegistration();
  });

  it('should show validation errors for empty required fields', () => {
    cy.get('#signupName').click().clear().blur();
    cy.contains('Name required').should('be.visible');
    cy.get('#signupName').should('have.class', 'is-invalid');

    cy.get('#signupLastName').click().clear().blur();
    cy.contains('Last name required').should('be.visible');

    cy.get('#signupEmail').click().clear().blur();
    cy.contains('Email required').should('be.visible');

    cy.get('#signupPassword').click().clear().blur();
    cy.contains('Password required').should('be.visible');

    cy.get('#signupRepeatPassword').click().clear().blur();
    cy.contains('Re-enter password required').should('be.visible');

    cy.get('.modal-footer .btn-primary').should('be.disabled');
  });

  it('should validate name and last name', () => {
    cy.get('#signupName').type('A').blur();
    cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');

    cy.get('#signupName').clear().type('Name123').blur();
    cy.contains('Name is invalid').should('be.visible');

    cy.get('#signupLastName').type('B').blur();
    cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');

    cy.get('#signupLastName').clear().type('Last1').blur();
    cy.contains('Last name is invalid').should('be.visible');
  });

  it('should validate email and password', () => {
    cy.get('#signupEmail').type('invalid-email').blur();
    cy.contains('Email is incorrect').should('be.visible');

    cy.get('#signupPassword').type('short', { sensitive: true }).blur();
    cy.contains(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    ).should('be.visible');

    cy.get('#signupPassword').clear().type('ValidPass1', { sensitive: true });
    cy.get('#signupRepeatPassword').type('Different1', { sensitive: true }).blur();
    cy.contains('Passwords do not match').should('be.visible');
  });

  it('should register a new user and login via custom command', () => {
    const email = `qa_${Date.now()}@test.com`;
    const password = 'Qwerty123';

    cy.get('#signupName').type('John');
    cy.get('#signupLastName').type('Doe');
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(password, { sensitive: true });

    cy.get('.modal-footer .btn-primary').should('not.be.disabled').click();

    cy.get('.sidebar').should('be.visible');

    cy.get('#userNavDropdown').click();
    cy.contains('Logout').click();

    cy.login(email, password);
    cy.get('.sidebar').should('be.visible');
  });
});
