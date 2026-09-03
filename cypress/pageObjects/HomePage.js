class HomePage {
  elements = {
    listaProdutos: () => cy.get(".card"),
    tituloProduto: () => cy.get(".shadow--avatar"),
    botaoComprar: () => cy.contains("button", "Comprar"),
    iconeCarrinho: () => cy.get(".carrinho > a"),
    quantidadeCarrinho: () => cy.get("[data-testid=quantidade-carrinho]"),
    botaoLogout: () => cy.get(".navbar-item.button")
  };

  adicionarPrimeiroProdutoAoCarrinho() {
    this.elements.botaoComprar().first().click();
    return this;
  }

  abrirCarrinho() {
    this.elements.iconeCarrinho().click();
    return this;
  }

  logout() {
    this.elements.botaoLogout().click();
    return this;
  }
}

export default new HomePage();
