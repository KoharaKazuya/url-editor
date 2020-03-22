describe("URL component [fragment]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("#fragment").should("not.exist");
    });
  });

  describe("with value", () => {
    beforeEach(() => {
      cy.get("@box").type("#fragment");
      cy.get("#fragment").as("section");
    });

    it("shows component title", () => {
      cy.get("@section").contains("fragment");
    });

    it("has no expand button", () => {
      cy.get("@section")
        .find('[aria-label="expand"]')
        .should("not.exist");
    });

    it("shows path value", () => {
      cy.get("@section").contains("fragment");
    });
  });
});
