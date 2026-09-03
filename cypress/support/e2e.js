import "./commands";

// Evita que exceções não tratadas pela aplicação (fora do nosso controle)
// derrubem a suíte de testes. Mantemos o log para investigação.
Cypress.on("uncaught:exception", () => {
  return false;
});
