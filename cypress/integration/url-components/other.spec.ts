describe("URL component [other]", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  describe("no value", () => {
    it("shows no section", () => {
      cy.get("[id]:not(#app):not(#url-text)").should("not.exist");
    });
  });

  describe("mailto", () => {
    beforeEach(() => {
      cy.get("@box").type(
        "mailto:alpha@example.com?cc=charlie@example.com&subject=REMOVE&body=Please%20remove%20me"
      );
    });

    it("shows component title", () => {
      cy.get("#scheme");
      cy.get("#to");
      cy.get("#subject");
      cy.get("#body");
      cy.get("#headers");
    });
  });

  describe("urn", () => {
    beforeEach(() => {
      cy.get("@box").type("urn:example:foo");
    });

    it("shows component title", () => {
      cy.get("#scheme");
      cy.get("#nid");
      cy.get("#nss");
    });
  });

  describe("urn uuid", () => {
    beforeEach(() => {
      cy.get("@box").type("urn:uuid:f81d4fae-7dec-11d0-a765-00a0c91e6bf6");
    });

    it("shows component title", () => {
      cy.get("#scheme");
      cy.get("#nid");
      cy.get("#uuid");
    });
  });
});
