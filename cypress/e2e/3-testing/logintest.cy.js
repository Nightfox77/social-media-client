describe("Login Functionality", () => {
  it("should successfully log in with valid credentials and store a token", () => {
    cy.visit("/");

    cy.get("#registerModal")
      .should("be.visible")
      .within(() => {
        cy.wait(300);
        cy.get('button[data-bs-target="#loginModal"]').should("exist").click();
      });

    // Ensure the login form is visible
    cy.get("#loginForm")
      .should("be.visible")
      .within(() => {
        cy.get('input[name="email"]').wait(500).type("testmail@noroff.no");
        cy.get('input[name="password"]').type("whatever");
        cy.get("button").contains("Login").click();
      });

    cy.wait(1000);

    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.a("string");
      expect(token).not.to.be.empty;
    });
  });
  it("should deny access and show errormessage when presented invalid login credentials", () => {
    cy.visit("/");

    cy.get("#registerModal")
      .should("be.visible")
      .within(() => {
        cy.wait(300);
        cy.get('button[data-bs-target="#loginModal"]').should("exist").click();
      });

    // Ensure the login form is visible
    cy.get("#loginForm")
      .should("be.visible")
      .within(() => {
        cy.get('input[name="email"]').wait(500).type("wrongmail@noroff.no");
        cy.get('input[name="password"]').type("wronpassword");
        cy.get("button").contains("Login").click();
      });
    cy.wait(500);
    cy.get(".alert").should("be.visible");

    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });
  });
});
