describe("URL component [port]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("#port").should("not.exist");
    });
  });

  describe("with value", () => {
    beforeEach(() => {
      cy.get("@box").type("http://example.com:80");
      cy.get("#port").as("section");
    });

    it("shows component title", () => {
      cy.get("@section").contains("port");
    });

    it("has no expand button", () => {
      cy.get("@section")
        .find('[aria-label="expand"]')
        .should("not.exist");
    });

    it("shows port value", () => {
      cy.get("@section").contains("80");
    });
  });
});
