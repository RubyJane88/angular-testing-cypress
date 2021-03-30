/// <reference types="cypress"/>

const VILLAINS = [
  {
    "id": "VillainElla",
    "name": "Ella",
    "description": "The Whipper"
  },
  {
    "id": "VillainLandon",
    "name": "Landon",
    "description": "The Mandalorian Mauler"
  }
]

describe('Villains Page', () => {
  beforeEach(() => {
    cy.getCommand('/api/villains', VILLAINS);
    cy.visit('/');
    cy.get('[data-testid=nav-villains]').click();
  });

  it('should land on the villains page', () => {
    cy.location('pathname').should('equal', '/villains');
  });

  it('should render two villains', () => {
    cy.get('[data-testid=card-villains]').should('have.length', 2);
  });

  it('should not delete a villain when No is clicked', () => {
    const index = 1;

    cy.get('[data-testid=delete-villain]').filter(':contains("Delete")').eq(index).click();
    cy.get('[data-testid=card-villains]').should('have.length', VILLAINS.length);
  });

  it('should delete a villain when Yes is clicked', () => {
    const index = 1;

    cy.deleteCommand('api/villains/*', VILLAINS, index);

    cy.get('[data-testid=delete-villain]').filter(':contains("Delete")').eq(index).click();
    cy.get('[data-testid=yes-button]').click();

    cy.get('[data-testid=card-villains]').should('have.length', VILLAINS.length -1);

  });

  it('should not add a new villain when Cancel button is clicked', () => {
    cy.get('[data-testid=add-button]').click();
    cy.SetupInputFieldsCommand();
    cy.get('@Name').type('Harlequin');
    cy.get('@Description').type('Psycho Queen');
    cy.get('[data-testid=cancel-button]').click();
  });

  it('should add a new villain when Save button is clicked', () => {
    const name= "Harlequin";
    const description = "Pyscho Queen";

    cy.get('[data-testid=add-button]').click();
    cy.SetupInputFieldsCommand();
    cy.get('@Name').type(name);
    cy.get('@Description').type(description);
    cy.postCommand('/villains', {name, description});
    cy.get('[data-testid=save-button]').click();

    cy.get('[data-testid=card-villains]').should('have.length', VILLAINS.length +1);
  });

  it('should edit an existing villain', () => {
    const index = 1;
    const villainToEdit = VILLAINS[index];
    const editedDescription = "Gone Girl";

    cy.get('[data-testid=edit-villain]').eq(index).click();

    cy.SetupInputFieldsCommand();
    cy.get('@Description').clear().type(editedDescription);
    cy.putCommand('/villains', {...villainToEdit, description: editedDescription});
    cy.get('[data-testid=save-button]').click();

    cy.get('[data-testid=card-villains]').should('have.length', VILLAINS.length);
    cy.get('[data-testid=card-description]').eq(index).should('contain', 'Gone');

  })




})

