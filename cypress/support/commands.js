// ============================================================
// Comandos customizados — Frontend (UI)
// ============================================================

/**
 * Realiza login via interface, usando os Page Objects.
 * Mantido em commands.js para reuso simples entre specs.
 */
Cypress.Commands.add("loginUI", (email, password) => {
  cy.visit("/login");
  cy.get("[data-testid=email]").clear().type(email);
  cy.get("[data-testid=senha]").clear().type(password);
  cy.get("[data-testid=entrar]").click();
});

// ============================================================
// Comandos customizados — API
// ============================================================

/**
 * Cria um usuário via API e retorna a resposta completa (cy.wrap),
 * permitindo encadear .then() no teste que chamou o comando.
 */
Cypress.Commands.add("apiCriarUsuario", (usuario) => {
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
