
describe('Login Functionality', () => {
  
    it('should successfully log in with valid credentials and store a token', () => {
      cy.visit('../../index.html');
      cy.get('.modal-footer').should('be.visible'); 

      cy.get('#modalLoginBtn').wait(500).click();


      cy.get('#loginForm').should('be.visible');
      cy.wait(300);
      cy.get('input[id="loginEmail"]').type('testmail@noroff.no'); 
      cy.get('input[id="loginPassword"]').type('whatever'); 
      cy.get('#loginBtn').click();  
      cy.wait(500);
      cy.window().then((win) => {
        const token = win.localStorage.getItem("token");
        expect(token).to.be.a("string");
        expect(token).not.to.be.empty;
      });
  
     
    });
  });
  