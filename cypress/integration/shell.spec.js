context("Shell", () => {
  // beforeEach(() => {
  // });

  it("Displays correct title", () => {
    cy.visit("http://localhost:8080/events/event2");

    cy.get("head")
      .find("title")
      .should('contain', 'London CSS: Event 2');
  });
});