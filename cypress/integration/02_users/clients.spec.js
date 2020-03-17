import moment from 'moment'
import components from '../../support/components'
const selectors = {
  name: 'div[data-cy="name-wrapper"] input',
  address: 'div[data-cy="address-wrapper"] input',
  email: 'div[data-cy="email-wrapper"] input',
  password: 'div[data-cy="password-wrapper"] input',
  tags: 'div[data-cy="tags-wrapper"] input',
  submit: 'button[type="submit"]',
  addButton: '[data-cy="add-button"]',
  contactPerson: 'input[name="contacts[0].name"]',
  contactEmail: 'input[name="contacts[0].email"]',
  contactPhone: 'input[name="contacts[0].phone"]',
  contactPosition: 'input[name="contacts[0].position"]'
}
context('Clients', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/client')
  })

  it('Client List', () => {
    cy
      .route('DELETE', '**/main/client/**')
      .as('createClient')

    cy.get('div[data-cy="table-row"]')
      .first()
      .click()


    cy.get('div[data-cy="dropdown-trigger"]').as('Trigger')

    cy.get('@Trigger').click()
    cy.contains('Delete').click()
    cy.get('@Trigger').click({force: true})

    cy.get('button[data-cy="confirmDialogOk"]').click()


  })

  it.only('Create Empty', () => {
    cy
      .route('POST', '**/main/client/')
      .as('create')

    cy.get('button[data-cy="table-add"]').click()

    cy.get(components.submit).click()

    cy.wait('@create')
      .its('status')
      .should('eq', 400)
  })
  it('Create Empty', () => {
    cy
      .route('POST', '**/main/client/')
      .as('createClient')

    cy.get('button[data-cy="table-add"]').click()

    const now = moment().format(' YYYY-MMM-DD HH:mm')
    const name = 'Client' + now
    const address = 'Address' + now
    const email = 'email@gmail.com' + moment().format('YYYY-MMM-DDTHH:mm')
    const password = 'test1234'

    cy.get(selectors.name).type(name)

    cy.get(selectors.address).type(address)
    cy.get(selectors.email).type(email)
    cy.get(selectors.password).type(password)

    cy.get(selectors.tags)
      .first()
      .type('tag', { force: true })
      .wait(50)
      .type('{enter}')
      .type('{enter}')

    cy.get(selectors.email).focus()

    cy.get(selectors.addButton).click()
    cy.get(selectors.contactPerson).type('name')
    cy.get(selectors.contactEmail).type('email')
    cy.get(selectors.contactPhone).type('+99892323232')
    cy.get(selectors.contactPosition).type('Position')

    cy.get(selectors.submit).click()

    cy.wait('@createClient')

    cy.location('pathname').should('eq', '/client')
  })
})
