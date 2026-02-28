describe("Negative: checkout validation", () => {
  it("blocks checkout with empty address", () => {
    cy.visit("/");
    cy.get('input[placeholder="email"]').clear().type("qa@test.com");
    cy.get('input[placeholder="password"]').clear().type("1234");
    cy.contains("Sign in").click();

    cy.contains("Add").first().click();
    cy.contains("Checkout").click();
    cy.contains("Place order").click();

    cy.contains("Address required");
  });
});