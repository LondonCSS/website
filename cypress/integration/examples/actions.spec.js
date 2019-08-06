/// <reference types="Cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000/");
  });

  // https://on.cypress.io/interacting-with-elements

  it(".type() - type into a DOM element", () => {
    cy.get(".title.register")
      .invoke("attr", "href")
      .should(
        "equal",
        "https://www.meetup.com/London-CSS-Meetup/events/262806212/"
      );
  });
});
