describe('LoginInput Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button.login-button').should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.get('input[placeholder="Password"]').type('any_password');
    cy.get('button.login-button').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('user@example.com');
    cy.get('button.login-button').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('wronguser@example.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button.login-button').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email or password is wrong');
    });
  });

  it('should display ThreadPage when username and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('fgfg@gmail.com');
    cy.get('input[placeholder="Password"]').type('fgfgfg');
    cy.get('button.login-button').click();


    cy.get('.thread-page').should('exist');
  });
});
