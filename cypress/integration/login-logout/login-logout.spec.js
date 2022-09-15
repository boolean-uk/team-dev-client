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

   
  });
});
