describe("Login Functionality", () => {
  before(() => {
    cy.visit("../../index.html");

    cy.get("#registerModal")
      .should("be.visible")
      .within(() => {
        cy.wait(300);
        cy.get('button[data-bs-target="#loginModal"]').should("exist").click();
      });
    cy.get("#loginForm")
      .should("be.visible")
      .within(() => {
        cy.get('input[name="email"]').wait(500).type("testmail@noroff.no");
        cy.get('input[name="password"]').type("whatever");
        cy.get("button").contains("Login").click();
      });

    cy.wait(1000);
    cy.get("body").should("have.class", "logged-in");
  });
  it("should successfully log out and remove the token ", () => {
    cy.contains("button", "Logout").click();
    cy.wait(1000);
    cy.get("body").should("not.have.class", "logged-in");
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.null;
    });
  });
});
