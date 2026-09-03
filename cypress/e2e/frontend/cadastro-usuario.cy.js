import { faker } from "@faker-js/faker";
import CadastroPage from "../../pageObjects/CadastroPage";

describe("Frontend | Cadastro de Usuário", () => {
  it("Deve cadastrar um novo usuário com sucesso e ser redirecionado para a Home", () => {
    const novoUsuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password({ length: 10 }),
      administrador: false
    };

    CadastroPage.visitar();
    CadastroPage.preencherFormulario(novoUsuario);
    CadastroPage.cadastrar();

    // Cadastro sem marcar "administrador" deve redirecionar para a Home do cliente
    cy.url().should("include", "/home");
    cy.get("[role=alert]").should("be.visible").and("contain.text", "sucesso");
  });
});
