describe('Header and Footer elements', () => {
  beforeEach(() => {
    cy.fixture('auth').then((auth) => {
      cy.visit('/', {
        auth: {
          username: auth.username,
          password: auth.password,
        },
      });
    });
  });

  it('should find all header buttons and links', () => {
    cy.get('.header_logo').should('be.visible');
    cy.contains('a.header-link', 'Home').should('be.visible');
    cy.contains('button.header-link', 'About').should('be.visible');
    cy.contains('button.header-link', 'Contacts').should('be.visible');
    cy.contains('button.header-link', 'Guest log in').should('be.visible');
    cy.get('.header_signin').should('be.visible').and('contain', 'Sign In');
  });

  it('should find all footer links', () => {
    const socialLinks = [
      'https://www.facebook.com/Hillel.IT.School',
      'https://t.me/ithillel_kyiv',
      'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1',
      'https://www.instagram.com/hillel_itschool/',
      'https://www.linkedin.com/school/ithillel/',
    ];

    cy.get('.socials_link')
      .should('have.length', 5)
      .and('be.visible')
      .each(($link, index) => {
        cy.wrap($link)
          .should('have.attr', 'href', socialLinks[index])
          .and('have.attr', 'target', '_blank');
      });

    cy.contains('a', 'ithillel.ua')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'ithillel.ua');
    cy.contains('a', 'support@ithillel.ua')
      .should('be.visible')
      .and('have.attr', 'href', 'mailto:developer@ithillel.ua');
  });
});
