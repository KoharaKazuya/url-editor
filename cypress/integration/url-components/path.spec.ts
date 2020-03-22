describe("URL component [path]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("#path").should("not.exist");
    });
  });

  describe("with value", () => {
    beforeEach(() => {
      cy.get("@box").type("/path/to/resource");
      cy.get("#path").as("section");
    });

    it("shows component title", () => {
      cy.get("@section").contains("path");
    });

    it("has expand button", () => {
      cy.get("@section")
        .find('[aria-label="expand"]')
        .should("be.visible");
    });

    it("shows path value", () => {
      cy.get("@section").contains("/path/to/resource");
    });

    describe("expanded content", () => {
      beforeEach(() => {
        cy.get("@section").within(() => {
          cy.get('[aria-label="expand"]')
            .as("expand")
            .click();
          cy.contains("label", "leading slash")
            .find("input")
            .as("leading");
          cy.contains("label", "trailing slash")
            .find("input")
            .as("trailing");
        });
      });

      it("has checked leading slash", () => {
        cy.get("@leading").should("be.checked");
      });

      it("has non-checked trailing slash", () => {
        cy.get("@trailing").should("not.be.checked");
      });

      it("has descructed values", () => {
        cy.get("@section")
          .find('input[type="text"]')
          .should($inputs => {
            expect($inputs).to.have.length(3);
            expect($inputs[0]).to.have.value("path");
            expect($inputs[1]).to.have.value("to");
            expect($inputs[2]).to.have.value("resource");
          });
      });

      it("updates URL", () => {
        cy.get("@leading").uncheck();
        cy.get("@trailing").check();

        cy.get("@section").within(() => {
          cy.get('input[type="text"]')
            .eq(0)
            .type("{backspace}");
          cy.get('[aria-label="delete"]')
            .eq(1)
            .click();
          cy.get('input[type="text"]')
            .eq(1)
            .clear()
            .type("1");
          cy.get('[aria-label="append"]').click();
          cy.get('input[type="text"]')
            .eq(2)
            .type("?");

          // sort
          cy.get('[aria-label="drag-handle"]')
            .first()
            .trigger("pointerdown", { which: 1, pageY: 100 })
            .trigger("pointermove", { which: 1, pageY: 900 })
            .trigger("pointerup", { force: true });
        });

        cy.get("@box").contains("1/%3F/pat");
      });
    });
  });
});
