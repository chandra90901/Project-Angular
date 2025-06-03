describe('E-CRAWLER', () => {
  it('verify url and login with valid credentials', () => {
    // Visit the login page
    cy.visit('http://localhost:4200/login');

    // Verify that URL is correct
    cy.url().should('include', '/login');

    // Enter username and password
    cy.get('#username').clear().type('yogesh'); 
    cy.get('#password').clear().type('yogesh'); 

    // Click the login button
    cy.get('button[type="submit"]').click();

    
    // Assert that login was successful 
    cy.url().should('include', '/dashboard'); 
    
  });
});