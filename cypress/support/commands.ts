// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// @ts-check
///<reference path="../global.d.ts" />
/// <reference types="cypress"/>
import "@cypress/code-coverage/support";
import "@testing-library/cypress/add-commands";
// @ts-ignore
import {v4 as uuidv4} from "uuid";

Cypress.Commands.add("getCommand", (url: string, responseBody: Array<any>) => {
  cy.intercept("GET", url, {
    statusCode: 200,
    body: responseBody,
  })
});

Cypress.Commands.add("deleteCommand", (url: string, responseBody: Array<any>) => {
  cy.intercept("DELETE", url, {
    statusCode: 200,
    body: responseBody,
  });
});

Cypress.Commands.add("postCommand", (url: string, requestBody: any) => {
  requestBody.id = uuidv4();

  cy.intercept("POST", url, {
    statusCode: 201,
    body: requestBody,
  });
});

Cypress.Commands.add("putCommand", (url: string, requestBody: any) => {
  cy.intercept("PUT", url, {
    statusCode: 200,
    body: requestBody,
  });
});

Cypress.Commands.add('SetupInputFieldsCommand', () => {
  cy.get('[data-testid=name]').as('Name');
  cy.get('[data-testid=description]').as('Description');
});
