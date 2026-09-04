// comandos de UI

Cypress.Commands.add('loginUI', (email, password) => {
  cy.visit('/login')
  cy.get('[data-testid=email]').clear().type(email)
  cy.get('[data-testid=senha]').clear().type(password)
  cy.get('[data-testid=entrar]').click()
})

// comandos de API
// uso failOnStatusCode: false pra poder validar status de erro (401, 400 etc)
// sem o Cypress quebrar o teste antes de eu conseguir checar a resposta

Cypress.Commands.add('apiCriarUsuario', (usuario) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: usuario,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: { email, password },
    failOnStatusCode: false
  })
})
