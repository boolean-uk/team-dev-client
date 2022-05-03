describe('User Registration', () => {
  describe("a valid user", () => {
    const url = Cypress.env('api_url')
    beforeEach(() => {
      cy.intercept('POST', `${url}/user`, { fixture: 'registration/valid-user.json' })
      cy.visit('/signup')
    })

    it('can register a user', () => {
      cy.get('#user-registration-link').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/signup`)

      cy.get('input[name=first_name]').type('Edward')
      cy.get('input[name=last_name]').type('Withers')
      cy.get('input[name=email]').type('test@test.com')
      cy.get('input[name=password]').type('test12')
      cy.get('input[name=biography]').type('a long bio')
      cy.get('input[name=github_url]').type('https://github.com/dearshrewdwit/')
      cy.get('#user-submit-button').click()
    })
  })
})
