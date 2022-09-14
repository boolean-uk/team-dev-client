describe("User Login Logout", () => {
  describe("a valid user", () => {
    beforeEach(() => {
      cy.intercept("POST", "http://localhost:4000/user", {
        fixture: "registration/valid-user.json",
      });
      cy.intercept("POST", "http://localhost:4000/login", {
        fixture: "login-logout/valid-user.json",
      });
      cy.intercept("GET", "http://localhost:4000/posts", {
        fixture: "posts/valid-posts.json",
      });
      cy.visit("/");
    });

    it("can login a user and be redirected to the posts page", () => {
      cy.get("#user-registration-link").click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}/signup`);

      cy.get("input[name=first_name]").type("Edward");
      cy.get("input[name=last_name]").type("Withers");
      cy.get("input[name=email]").type("test@test.com");
      cy.get("input[name=password]").type("test12");
      cy.get("input[name=biography]").type("a long bio");
      cy.get("input[name=github_url]").type("https://github.com/dearshrewdwit");
      cy.get("#user-submit-button").click();

      cy.get("#user-login-link").click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);

      cy.get("input[name=email]").type("test@test.com");
      cy.get("input[name=password]").type("test12");
      cy.get("#user-submit-button").click();

      cy.url().should("eq", `${Cypress.config("baseUrl")}/posts`);
    });

    it("can log out after login", () => {
      cy.get("#user-registration-link").click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}/signup`);

      cy.get("input[name=first_name]").type("Edward");
      cy.get("input[name=last_name]").type("Withers");
      cy.get("input[name=email]").type("test@test.com");
      cy.get("input[name=password]").type("test12");
      cy.get("input[name=biography]").type("a long bio");
      cy.get("input[name=github_url]").type("https://github.com/dearshrewdwit");
      cy.get("#user-submit-button").click();

      cy.get("#user-login-link").click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);

      cy.get("input[name=email]").type("test@test.com");
      cy.get("input[name=password]").type("test12");
      cy.get("#user-submit-button").click();

      cy.url().should("eq", `${Cypress.config("baseUrl")}/posts`);

      cy.get("#user-signout-button").click();
      cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    });
  });
});
