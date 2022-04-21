import homeJson from '../../fixtures/home.json'

/* eslint-disable no-undef */
describe('Home Flow', () => {
  beforeEach(() => {
    cy.loginSkipper({
      url: 'http://localhost:3000/',
    });
  });

  it('Should list movies and series', () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;

      worker.use(
        rest.get(`${Cypress.env('baseApi')}trending/all/day?api_key=${Cypress.env('apiKey')}&language=pt-BR`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(homeJson)
          )
        }),
      );

      cy.findAllByTestId('movie-item').should(($lis) => {
        expect($lis).to.have.length(6);

        expect($lis.eq(0)).to.contain('Batman');
        expect($lis.eq(1)).to.contain('Homem-Aranha: Sem Volta Para Casa');
        expect($lis.eq(2)).to.contain('Animais Fantásticos: Os Segredos de Dumbledore');
        expect($lis.eq(3)).to.contain('Thor: Amor e Trovão');
        expect($lis.eq(4)).to.contain('X');
      });

      cy.findAllByTestId('serie-item').should(($lis) => {
        expect($lis).to.have.length(6);

        expect($lis.eq(0)).to.contain('Cavaleiro da Lua');
        expect($lis.eq(1)).to.contain('Better Call Saul');
        expect($lis.eq(2)).to.contain('Boneca Russa');
        expect($lis.eq(3)).to.contain('O Submarino');
        expect($lis.eq(4)).to.contain('Doctor Who');
      });
    });
  });

  it('should redirect to movies page from header', () => {
    cy.findByTestId('header-movies-button').click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).equal('/movies/');
    });
  });

  it('should redirect to series page from header', () => {
    cy.findByTestId('header-series-button').click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).equal('/series/');
    });
  });

  it('should redirect to movies page', () => {
    cy.findByTestId('all-movies-button').click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).equal('/movies/');
    });
  });

  it('should redirect to selected movie page', () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;

      worker.use(
        rest.get(`${Cypress.env('baseApi')}trending/all/day?api_key=${Cypress.env('apiKey')}&language=pt-BR`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(homeJson)
          )
        }),
      );

      cy.findAllByTestId('movie-item').should(($lis) => {
        $lis[2].click();
      });

      cy.location().should((loc) => {
        expect(loc.pathname).equal('/movie/338953/');
      });
    });
  });

  it('should redirect to series page', () => {
    cy.findByTestId('all-series-button').click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).equal('/series/');
    });
  });

  it('should redirect to selected serie page', () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;

      worker.use(
        rest.get(`${Cypress.env('baseApi')}trending/all/day?api_key=${Cypress.env('apiKey')}&language=pt-BR`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json(homeJson)
          )
        }),
      );

      cy.findAllByTestId('serie-item').should(($lis) => {
        $lis[4].click();
      });
  
      cy.location().should((loc) => {
        expect(loc.pathname).equal('/serie/57243/');
      });
    });
  });

  it('should make logout', () => {
    cy.findByTestId('logout-button').click({ force: true });

    cy.location().should((loc) => {
      expect(loc.pathname).equal('/login/');
      expect(localStorage.getItem('animes.credentials')).to.eq(null);
    });
  });
})