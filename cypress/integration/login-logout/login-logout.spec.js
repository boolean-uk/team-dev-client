describe('User Login Logout', () => {
  describe("a valid user", () => {
    const url = Cypress.env('api_url')
    beforeEach(() => {
      cy.intercept('POST', `${url}/user`, { fixture: 'registration/valid-user.json' })
      cy.intercept('POST', `${url}/login`, { fixture: 'login-logout/valid-user.json' })
      cy.intercept('GET', `${url}/posts`, { fixture: 'posts/valid-posts.json' })
      cy.visit('/login')
    })

    it('can login a user and be redirected to the posts page', () => {
      cy.get('#user-registration-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`)

      cy.get('input[name=first_name]').type('Edward')
      cy.get('input[name=last_name]').type('Withers')
      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('input[name=biography]').type('a long bio')
      cy.get('input[name=github_url]').type('https://github.com/dearshrewdwit')
      cy.get('#user-submit-button').click()

      cy.get('#user-login-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/login`)

      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('#user-submit-button').click()

      cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    })

    it('can log out after login', () => {
      cy.get('#user-registration-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`)

      cy.get('input[name=first_name]').type('Edward')
      cy.get('input[name=last_name]').type('Withers')
      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('input[name=biography]').type('a long bio')
      cy.get('input[name=github_url]').type('https://github.com/dearshrewdwit')
      cy.get('#user-submit-button').click()

      cy.get('#user-login-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/login`)

      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('#user-submit-button').click()

      cy.url().should('eq', `${Cypress.config('baseUrl')}/`)

      cy.get('#user-signout-button').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/login`)
    })
  })
})
