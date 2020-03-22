describe("Serizalization into website URL", () => {
  it("reflects input text to website URL", () => {
    cy.visit("/");
    cy.get('[role="textbox"]').type("https://example.com/");
    cy.url().should("contain", "?url=https%3A%2F%2Fexample.com%2F");
  });

  it("restores input text from website URL", () => {
    cy.visit("/?url=https%3A%2F%2Fexample.com%2F");
    cy.contains("https://example.com/");
  });

  it("reflects URL component focus to website URL", () => {
    cy.visit("/");
    cy.get('[role="textbox"]').type("https://example.com/");
    cy.get('#host [aria-label="expand"]').click();
    cy.url().should("contain", "#host");
  });

  it("restores URL component focus from website URL", () => {
    cy.visit("/?url=https%3A%2F%2Fexample.com%2F#host");
    cy.get('#host [aria-label="collapse"]');
  });
});
