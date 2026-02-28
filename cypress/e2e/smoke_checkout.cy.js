describe("Smoke: checkout success", () => {
  it("logs in, adds product, checks out", () => {
    cy.visit("/");
    cy.contains("Login");

    cy.get('input[placeholder="email"]').clear().type("qa@test.com");
    cy.get('input[placeholder="password"]').clear().type("1234");
    cy.contains("Sign in").click();

    cy.contains("Products");
    cy.contains("Add").first().click();
    cy.contains("Cart").click();
    cy.contains("x");

    cy.contains("Checkout").click();
    cy.get('input[placeholder="address"]').type("123 Test Street");
    cy.contains("Place order").click();

    cy.contains("Order placed successfully");
  });
});