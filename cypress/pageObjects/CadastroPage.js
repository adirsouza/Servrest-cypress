class CadastroPage {
  elements = {
    campoNome: () => cy.get("[data-testid=nome]"),
    campoEmail: () => cy.get("[data-testid=email]"),
    campoSenha: () => cy.get("[data-testid=senha]"),
    checkboxAdmin: () => cy.get("[data-testid=checkbox]"),
    botaoCadastrar: () => cy.get("[data-testid=cadastrar]"),
    mensagemAlerta: () => cy.get("[role=alert]")
  };

  visitar() {
    cy.visit("/cadastrarusuarios");
    return this;
  }

  preencherFormulario({ nome, email, senha, administrador = false }) {
    this.elements.campoNome().clear().type(nome);
    this.elements.campoEmail().clear().type(email);
    this.elements.campoSenha().clear().type(senha);
    if (administrador) {
      this.elements.checkboxAdmin().check();
    }
    return this;
  }

  cadastrar() {
    this.elements.botaoCadastrar().click();
    return this;
  }
}

export default new CadastroPage();
