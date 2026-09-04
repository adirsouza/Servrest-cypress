describe('API | GET /produtos', () => {
  it('lista os produtos cadastrados e valida o contrato de cada item', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/produtos`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.produtos).to.be.an('array').and.have.length.greaterThan(0)

      response.body.produtos.forEach((produto) => {
        expect(produto).to.have.all.keys('nome', 'preco', 'descricao', 'quantidade', '_id')
        expect(produto.nome).to.be.a('string')
        expect(produto.preco).to.be.a('number')
        expect(produto.quantidade).to.be.a('number')
      })
    })
  })
})
