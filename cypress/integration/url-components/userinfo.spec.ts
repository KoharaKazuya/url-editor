describe("URL component [userinfo]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("#userinfo").should("not.exist");
    });
  });

  describe("with value", () => {
    beforeEach(() => {
      cy.get("@box").type(
        "http://%E5%B1%B1%E7%94%B0%20%E5%A4%AA%E9%83%8E:P%40ssw0rd!@example.com"
      );
      cy.get("#userinfo").as("section");
    });

    it("shows component title", () => {
      cy.get("@section").contains("userinfo");
    });

    it("has expand button", () => {
      cy.get("@section")
        .find('[aria-label="expand"]')
        .should("be.visible");
    });

    it("shows userinfo value", () => {
      cy.get("@section").contains(
        "%E5%B1%B1%E7%94%B0%20%E5%A4%AA%E9%83%8E:P%40ssw0rd!"
      );
    });

    describe("expanded content", () => {
      beforeEach(() => {
        cy.get("@section").within(() => {
          cy.get('[aria-label="expand"]')
            .as("expand")
            .click();
          cy.contains("label", "user")
            .find("input")
            .as("user-input");
          cy.contains("label", "password")
            .find("input")
            .as("password-input");
        });
      });

      it("shows user unicode string", () => {
        cy.get("@user-input").should("have.value", "山田 太郎");
      });

      it("shows password unicode string", () => {
        cy.get("@password-input").should("have.value", "P@ssw0rd!");
      });

      it("updates URL", () => {
        cy.get("@user-input")
          .clear()
          .type("山");
        cy.get("@password-input")
          .clear()
          .type(" ");
        cy.get("@box").contains("http://%E5%B1%B1:%20@example.com");
      });
    });
  });
});
