context("News", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("Render social links", () => {
    cy.get(".social")
      .find("[data-social-link]")
      .should($t => {
        expect($t).to.have.length(3);
      });
  });
});
