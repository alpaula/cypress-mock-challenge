/* eslint-disable no-undef */
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  })

  it('Should display error email format message', () => {
    cy.findByTestId('email-input')
      .type('ceci');

    cy.findByTestId('password-input')
      .type('123456');

    cy.findByTestId('login-button').click();

    cy.findByTestId('email-input')
      .should('have.css', 'border-color', 'rgb(255, 3, 71)')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.findByTestId('password-input')
      .should('have.css', 'border-color', 'rgb(255, 3, 71)')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.findByTestId('error-message')
      .contains('Verifique o formato de email')
      .should('exist');
  })

  it('Should display error email or passord message', () => {
    cy.findByTestId('email-input')
      .type('cecilia@gmail.com.br');

    cy.findByTestId('password-input')
      .type('123456');

    cy.findByTestId('login-button').click();

    cy.findByTestId('email-input')
      .should('have.css', 'border-color', 'rgb(255, 3, 71)')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.findByTestId('password-input')
      .should('have.css', 'border-color', 'rgb(255, 3, 71)')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.findByTestId('error-message')
      .contains('usuário e/ou senha errados, tente novamente')
      .should('exist');
  })

  it('Should make login', () => {
    cy.findByTestId('email-input')
      .type('cecilia@gmail.com');

    cy.findByTestId('password-input')
      .type('123456');

    cy.findByTestId('login-button').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/');
    });
  })
})