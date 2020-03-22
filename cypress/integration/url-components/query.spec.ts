describe("URL component [query]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("#query").should("not.exist");
    });
  });

  describe("with value", () => {
    beforeEach(() => {
      cy.get("@box").type("?q=%E4%BE%8B&ok=1");
      cy.get("#query").as("section");
    });

    it("shows component title", () => {
      cy.get("@section").contains("query");
    });

    it("has expand button", () => {
      cy.get("@section")
        .find('[aria-label="expand"]')
        .should("be.visible");
    });

    it("shows path value", () => {
      cy.get("@section").contains("q=%E4%BE%8B&ok=1");
    });

    describe("expanded content", () => {
      beforeEach(() => {
        cy.get("@section").within(() => {
          cy.get('[aria-label="expand"]')
            .as("expand")
            .click();
          cy.get("input")
            .eq(0)
            .as("key1");
          cy.get("input")
            .eq(1)
            .as("value1");
          cy.get("input")
            .eq(2)
            .as("key2");
          cy.get("input")
            .eq(3)
            .as("value2");
        });
      });

      it("has destructed values", () => {
        cy.get("@key1").should("have.value", "q");
        cy.get("@value1").should("have.value", "例");
        cy.get("@key2").should("have.value", "ok");
        cy.get("@value2").should("have.value", "1");
      });

      it("updates URL", () => {
        cy.get("@section")
          .find('[aria-label="delete"]')
          .first()
          .click();
        cy.get("@key1")
          .clear()
          .type("✔︎");
        cy.get("@value1").type("1");
        cy.get("@section")
          .find('[aria-label="append"]')
          .click();
        cy.get("@key2").type("test");
        cy.get("@value2").type("2");

        cy.get("@box").contains("?%E2%9C%94%EF%B8%8E=11&test=2");
      });
    });
  });
});
