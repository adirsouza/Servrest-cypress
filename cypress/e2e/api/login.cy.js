import { faker } from "@faker-js/faker";

describe("API | POST /login", () => {
  const apiUrl = Cypress.env("apiUrl");
  let usuario;

  before(() => {
    // Cria um usuário exclusivo para este spec, evitando dependência
    // de credenciais fixas/compartilhadas entre execuções.
    usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      administrador: "false"
    };

    cy.apiCriarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("Deve autenticar com sucesso e retornar um token de autorização válido", () => {
    cy.apiLogin(usuario.email, usuario.password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Login realizado com sucesso");
      expect(response.body.authorization).to.be.a("string");
      expect(response.body.authorization).to.match(/^Bearer\s/);
    });
  });

});
