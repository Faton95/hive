context('Contract', () => {
  let fixtures

  beforeEach(() => {
    cy.login()
    cy.fixture('contract').then(data => {
      fixtures = data
    })
  })

  it('Create Empty', () => {
    cy.visit('contract')
  })

})
