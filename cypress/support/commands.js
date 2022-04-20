/* eslint-disable no-undef */
import '@testing-library/cypress/add-commands';

const user = {
  id: 'abc123',
  email: 'cecilia@gmail.com',
  firstName: 'Cecília',
  lastName: 'Fonseca',
  avatar: ''
}

Cypress.Commands.add('loginSkipper', (info) => {
	window.localStorage.setItem(
    'animes.credentials',
    JSON.stringify(user)
  );
	cy.visit(info.url);
});
