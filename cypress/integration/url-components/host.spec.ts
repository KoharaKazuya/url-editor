describe("URL component [host]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("#host").should("not.exist");
    });
  });

  describe("with value", () => {
    beforeEach(() => {
      cy.get("@box").type("http://xn--eckwd4c7cu47r2wf.example");
      cy.get("#host").as("section");
    });

    it("shows component title", () => {
      cy.get("@section").contains("host");
    });

    it("has expand button", () => {
      cy.get("@section")
        .find('[aria-label="expand"]')
        .should("be.visible");
    });

    it("shows host value", () => {
      cy.get("@section").contains("xn--eckwd4c7cu47r2wf.example");
    });

    describe("expanded content", () => {
      beforeEach(() => {
        cy.get("@section").within(() => {
          cy.get('[aria-label="expand"]')
            .as("expand")
            .click();
          cy.get("input").as("host-input");
        });
      });

      it("shows unicode string", () => {
        cy.get("@host-input").should("have.value", "ドメイン名例.example");
      });

      it("updates URL", () => {
        cy.get("@host-input").type("{home}{del}{del}{del}{del}{del}");
        cy.get("@box").contains("http://xn--fsq.example/");
      });
    });
  });
});
