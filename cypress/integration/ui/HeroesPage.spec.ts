/// <reference types="cypress"/>

const HEROES = [
  {
    id: 'HeroIngrid',
    name: 'Ingrid the Fearless',
    description: 'warrior queen',
  },
  {
    id: 'HeroOlav',
    name: 'Olav the Boneless',
    description: 'commander of the Great Heathen Army',
  },
];

describe("Heroes Page", () => {

  beforeEach(() => {
    cy.getCommand('/api/heroes', HEROES);
    // cy.deleteCommand('/api/heroes/*')
    cy.visit('/')

  });

  it('should land on the heroes page', () => {
  cy.location('pathname').should('equal', '/heroes');
  });

  it('should render 2 heroes', () => {
    cy.get('[data-testid=card]').should('have.length', 2);
  });

it('should not delete a hero when No is clicked', () => {
  const index = 1;

  cy.get('[data-testid=delete-hero]').filter(':contains("Delete")').eq(index).click();
  cy.get('[data-testid=card]').should('have.length', HEROES.length);

});

it('should delete a hero when Yes is clicked', () => {
  const index = 1;

  cy.deleteCommand('api/heroes/*', HEROES, index);

  cy.get('[data-testid=delete-hero]').filter(':contains("Delete")').eq(index).click();
  cy.get('[data-testid=yes-button]').click();

  cy.get('[data-testid=card]').should('have.length', HEROES.length -1);
});

  it('should not add a new hero when Cancel button is clicked', () => {
   cy.get('[data-testid=add-button]').click();
   cy.SetupInputFieldsCommand();
   cy.get('@Name').type('Naruto');
   cy.get('@Description').type('Nine-tailed Fox');
   cy.get('[data-testid=cancel-button]').click();

  })

it('should add a new hero when Save button is clicked', () => {
  const name = "Code Girl";
  const description = "Hacker Princess";

  cy.get('[data-testid=add-button]').click();
  cy.SetupInputFieldsCommand();
  cy.get('@Name').type(name);
  cy.get('@Description').type(description);
  cy.postCommand('/heroes', {name, description});
  cy.get('[data-testid=save-button]').click();

  cy.get('[data-testid=card]').should('have.length', HEROES.length +1);
});

  it('should edit an existing hero', () => {
    const index = 0;
    const heroToEdit = HEROES[index];
    const editedDescription = 'Ice Warrior Princess';

    cy.get('[data-testid=edit-hero]').eq(index).click();

    cy.SetupInputFieldsCommand();
    cy.get('@Description').clear().type(editedDescription);
    cy.putCommand('/heroes', {...heroToEdit, description: editedDescription});
    cy.get('[data-testid=save-button]').click();

    cy.get('[data-testid=card]').should('have.length', HEROES.length);
    cy.get('[data-testid=card-description]').eq(index).should('contain', 'Ice');
  })



})
