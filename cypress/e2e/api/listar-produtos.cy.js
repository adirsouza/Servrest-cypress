describe("API | GET /produtos", () => {
  it("Deve listar os produtos cadastrados e validar o contrato de cada item", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/produtos`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("quantidade");
      expect(response.body.produtos).to.be.an("array").and.have.length.greaterThan(0);

      // Valida o contrato (schema) de cada produto retornado
      response.body.produtos.forEach((produto) => {
        expect(produto).to.have.all.keys(
          "nome",
          "preco",
          "descricao",
          "quantidade",
          "_id"
        );
        expect(produto.nome).to.be.a("string");
        expect(produto.preco).to.be.a("number");
        expect(produto.descricao).to.be.a("string");
        expect(produto.quantidade).to.be.a("number");
        expect(produto._id).to.be.a("string");
      });
    });
  });
});
