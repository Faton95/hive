context('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.server()
  })

  it('Incorrect credentials', () => {
    cy
      .route('POST', '**/main/login/')
      .as('login')

    cy.get('[data-cy="username-wrap"] input').type('admin')
    cy.get('[data-cy="password-wrap"] input').type('test12')
    cy.get('button[data-cy="submit"]').click()

    cy.wait('@login')
    cy
      .get('div[data-cy="auth-error-wrapper"] > div')
      .contains('Unable to log in with provided credentials.')

    cy.location('pathname').should('eq', '/login')
  })

  it('Required Fields', () => {
    cy
      .route('POST', '**/main/login/')
      .as('login')

    cy.get('button[data-cy="submit"]').click()

    cy.wait('@login')

    cy.get('div[data-cy="username-wrap"]').contains('This field is required.')
    cy.get('div[data-cy="password-wrap"]').contains('This field is required.')
    cy.location('pathname').should('eq', '/login')
  })

  it('Successful Login', () => {
    cy
      .route('GET', '**/main/assignment/')
      .as('getToken')

    cy.get('[data-cy="username-wrap"] input').type('admin')
    cy.get('[data-cy="password-wrap"] input').type('test1234')
    cy.get('button[data-cy="submit"]').click()

    cy.wait('@getToken')

    cy.location('pathname').should('eq', '/assignment')
  })
})
