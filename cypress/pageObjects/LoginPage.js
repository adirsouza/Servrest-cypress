class LoginPage {
  elements = {
    campoEmail: () => cy.get('[data-testid=email]'),
    campoSenha: () => cy.get('[data-testid=senha]'),
    botaoEntrar: () => cy.get('[data-testid=entrar]'),
    linkCadastrar: () => cy.get('[data-testid=cadastrar]'),
    mensagemAlerta: () => cy.get('[role=alert]'),
    botaoFecharAlerta: () => cy.get('[data-testid=fechar-alerta]')
  }

  visitar() {
    cy.visit('/login')
    return this
  }

  preencherEmail(email) {
    this.elements.campoEmail().clear().type(email)
    return this
  }

  preencherSenha(senha) {
    this.elements.campoSenha().clear().type(senha)
    return this
  }

  clicarEntrar() {
    this.elements.botaoEntrar().click()
    return this
  }

  clicarCadastrar() {
    this.elements.linkCadastrar().click()
    return this
  }

  // atalho pra não ficar repetindo os 3 passos em todo teste de login
  fazerLogin(email, senha) {
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarEntrar()
    return this
  }
}

export default new LoginPage()
