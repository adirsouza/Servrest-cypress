import { faker } from "@faker-js/faker";

describe("API | POST /usuarios", () => {
  it("Deve cadastrar um novo usuário com sucesso, validar o contrato da resposta e remover a massa criada", () => {
    const usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      administrador: "false"
    };

    cy.apiCriarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body).to.have.property("_id");
      expect(response.body._id).to.be.a("string").and.have.length(16);

      // Boa prática: limpar a massa de dados criada pelo próprio teste,
      // mantendo o ambiente limpo para execuções seguintes.
      cy.request({
        method: "DELETE",
        url: `${Cypress.env("apiUrl")}/usuarios/${response.body._id}`
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq("Registro excluído com sucesso");
      });
    });
  });
});
