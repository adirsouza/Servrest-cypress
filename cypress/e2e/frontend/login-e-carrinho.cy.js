import { faker } from "@faker-js/faker";
import LoginPage from "../../pageObjects/LoginPage";
import HomePage from "../../pageObjects/HomePage";

describe("Frontend | Login e Carrinho", () => {
  let usuario;

  before(() => {
    // Cria um usuário fresco via API para garantir que o teste de UI
    // não dependa de massa de dados fixa/compartilhada (evita flakiness).
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

  it("Deve logar com sucesso e adicionar um produto ao carrinho", () => {
    LoginPage.visitar();
    LoginPage.fazerLogin(usuario.email, usuario.password);

    cy.url().should("include", "/home");

    HomePage.elements.listaProdutos().should("have.length.greaterThan", 0);
    HomePage.adicionarPrimeiroProdutoAoCarrinho();

    // O contador do carrinho deve refletir o item adicionado
    HomePage.elements.quantidadeCarrinho().should("contain.text", "1");
  });
});
