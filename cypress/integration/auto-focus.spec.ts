describe("auto focus", () => {
  it("focuses URL input box just after page loaded", () => {
    cy.visit("/");
    cy.get('[role="textbox"]').should("have.focus");
  });

  it("does not focus when loaded with fragment", () => {
    cy.visit("/?url=https%3A%2F%2Fexample.com#host");
    cy.get('[role="textbox"]').should("not.have.focus");
  });

  it("focuses when header click", () => {
    cy.visit("/?url=https%3A%2F%2Fexample.com#host");
    cy.contains("URL Editor").click();
    cy.get('[role="textbox"]').should("have.focus");
  });
});
