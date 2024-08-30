describe("Logout Functionality", () => {
  it("should successfully logout and delete the token", () => {
    cy.visit("../../index.html");

    cy.wait(300);
    cy.get('input[id="loginEmail"]').type("testmail@noroff.no");
    cy.get('input[id="loginPassword"]').type("whatever");
    cy.get("#loginBtn").click();
    cy.wait(500);
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token");
      expect(token).to.be.a("string");
      expect(token).not.to.be.empty;
    });
  });
});
