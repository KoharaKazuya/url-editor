describe("URL input box", () => {
  const fullCompUrl =
    "https://example:pass123@example.com:8080/path/to/resource?test=1&q=t#ExampleData";

  beforeEach(() => {
    cy.visit("/");
    cy.get('[role="textbox"]').as("box");
  });

  it("shows inputed text as it is", () => {
    cy.get("@box")
      .type("hello^world")
      .contains("hello^world");
  });

  it("shows URL", () => {
    cy.get("@box")
      .type("https://example.com/")
      .contains("https://example.com/");
  });

  it("shows full component URL", () => {
    cy.get("@box")
      .type(fullCompUrl)
      .contains(fullCompUrl);
  });

  describe("highlight", () => {
    beforeEach(() => {
      cy.get("@box").type(fullCompUrl);
    });

    it("colorize scheme component", () => {
      cy.get("@box").within(() => {
        cy.contains("https")
          .should("have.attr", "style")
          .and("match", /var\(--color-component-scheme\)/);
      });
    });

    it("colorize userinfo component", () => {
      cy.get("@box").within(() => {
        cy.contains("example:pass123")
          .should("have.attr", "style")
          .and("match", /var\(--color-component-userinfo\)/);
      });
    });

    it("colorize host component", () => {
      cy.get("@box").within(() => {
        cy.contains("example.com")
          .should("have.attr", "style")
          .and("match", /var\(--color-component-host\)/);
      });
    });

    it("colorize port component", () => {
      cy.get("@box").within(() => {
        cy.contains("8080")
          .should("have.attr", "style")
          .and("match", /var\(--color-component-port\)/);
      });
    });

    it("colorize path component", () => {
      cy.get("@box").within(() => {
        cy.contains("/path/to/resource")
          .should("have.attr", "style")
          .and("match", /var\(--color-component-path\)/);
      });
    });

    it("colorize query component", () => {
      cy.get("@box").within(() => {
        cy.contains("test=1&q=t")
          .should("have.attr", "style")
          .and("match", /var\(--color-component-query\)/);
      });
    });

    it("colorize fragment component", () => {
      cy.get("@box").within(() => {
        cy.contains("ExampleData")
          .should("have.attr", "style")
          .and("match", /var\(--color-component-fragment\)/);
      });
    });
  });

  describe("vitit URL button", () => {
    beforeEach(() => {
      cy.get('[aria-label="visit"]').as("visit");
    });

    it("opens new tab", () => {
      cy.get("@box").type("http://example.com/");
      cy.get("@visit")
        .should("have.attr", "target", "_blank")
        .should("have.attr", "href", "http://example.com/");
    });

    it("is disabled while non-URL", () => {
      cy.get("@visit").should("be.disabled");

      cy.get("@box").type("xxx");
      cy.get("@visit").should("be.disabled");

      cy.get("@box")
        .clear()
        .type("mailto:test@example.com");
      cy.get("@visit").should("be.disabled");
    });
  });

  describe("paste URL button", () => {
    beforeEach(() => {
      cy.get('[aria-label="paste"]').as("paste");
    });

    it.skip("is visible while empty URL", () => {
      // chrome only
      cy.get("@paste").should("be.visible");
    });

    it.skip("paste clipboard URL into box", () => {
      cy.get("@paste").click();
      cy.get("@box").contains("dummy URL");
    });
  });

  describe("copy URL button", () => {
    beforeEach(() => {
      cy.get("@box").type("test");
      cy.get('[aria-label="copy"]').as("copy");
    });

    it("is visible while non-empty URL", () => {
      cy.get("@copy").should("be.visible");
    });

    it.skip("copy URL into clipboard", () => {
      cy.get("@copy").click();
      // expect(clipboard.text).to.equals('test');
    });
  });
});
