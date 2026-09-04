import './commands'

// alguns erros de console da própria aplicação (fora do nosso controle)
// derrubavam a suíte inteira, então ignoro exceções não tratadas aqui
Cypress.on('uncaught:exception', () => false)
