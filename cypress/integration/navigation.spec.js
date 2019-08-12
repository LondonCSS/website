context("News", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Renders main navigation including subnav", () => {
    cy.get("[data-app-nav]")
      .find("[data-app-link]")
      .should($t => {
        expect($t).to.have.length(5);
      });
  });

  it("Renders sub navigation", () => {
    cy.getByTestId("subnav").should('exist');
  });

  // TODO: check subnav visibility at small resolutions
});
