describe("Invalid URL input", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]')
      .as("box")
      .type("http://");
  });

  it("shows error message", () => {
    cy.contains("Error");
    cy.contains("HTTP URIs must have a host.");
  });
});
