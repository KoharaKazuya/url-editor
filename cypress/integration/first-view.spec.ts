describe("First view of web site", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows web site title", () => {
    cy.contains("URL Editor");
  });

  it("shows input box", () => {
    cy.get("[contenteditable]");
  });

  it("shows author", () => {
    cy.contains("KoharaKazuya");
  });

  // @see <https://github.com/cypress-io/cypress/issues/6207>
  it.skip("focuses input box", () => {
    cy.get("[contenteditable]").should("have.focus");
  });

  describe("footer links", () => {
    it("are external links", () => {
      cy.get("footer a").each($a => {
        cy.wrap($a).should("have.attr", "target", "_blank");
      });
    });
  });
});
