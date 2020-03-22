describe("URL component [scheme]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("#scheme").should("not.exist");
    });
  });

  describe("http", () => {
    beforeEach(() => {
      cy.get("@box").type("http://example.com");
      cy.get("#scheme").as("section");
    });

    it("shows component title", () => {
      cy.get("@section").contains("scheme");
    });

    it("has no expand button", () => {
      cy.get("@box").type("http://example.com");
      cy.get("@section")
        .find('[aria-label="expand"]')
        .should("not.exist");
    });

    it("scheme sction visible", () => {
      cy.get("@section").should("be.visible");
    });

    it("shows scheme value", () => {
      cy.get("@section").contains("http");
    });
  });

  describe("https", () => {
    beforeEach(() => {
      cy.get("@box").type("https://example.com/");
      cy.get("#scheme").as("section");
    });

    it("scheme sction visible", () => {
      cy.get("@section").should("be.visible");
    });

    it("shows scheme value", () => {
      cy.get("@section").contains("https");
    });
  });

  describe("mailto", () => {
    beforeEach(() => {
      cy.get("@box").type("mailto:test@example.com");
      cy.get("#scheme").as("section");
    });

    it("scheme sction visible", () => {
      cy.get("@section").should("be.visible");
    });

    it("shows scheme value", () => {
      cy.get("@section").contains("mailto");
    });
  });

  describe("urn", () => {
    beforeEach(() => {
      cy.get("@box").type("urn:test:example");
      cy.get("#scheme").as("section");
    });

    it("scheme sction visible", () => {
      cy.get("@section").should("be.visible");
    });

    it("shows scheme value", () => {
      cy.get("@section").contains("urn");
    });
  });

  describe("other", () => {
    beforeEach(() => {
      cy.get("@box").type("chrome://about");
      cy.get("#scheme").as("section");
    });

    it("scheme sction visible", () => {
      cy.get("@section").should("be.visible");
    });

    it("shows scheme value", () => {
      cy.get("@section").contains("chrome");
    });
  });
});
