import { faker } from '@faker-js/faker'
import LoginPage from '../../pageObjects/LoginPage'
import HomePage from '../../pageObjects/HomePage'

describe('Frontend | Login e Carrinho', () => {
  let usuario

  before(() => {
    // crio o usuário direto pela API, assim o teste de UI não fica
    // amarrado a nenhuma massa de dados fixa e roda mais rápido
    usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      administrador: 'false'
    }

    cy.apiCriarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('loga com sucesso e adiciona um produto ao carrinho', () => {
    LoginPage.visitar()
    LoginPage.fazerLogin(usuario.email, usuario.password)

    cy.url().should('include', '/home')

    HomePage.elements.listaProdutos().should('have.length.greaterThan', 0)
    HomePage.adicionarPrimeiroProdutoAoCarrinho()

    HomePage.elements.quantidadeCarrinho().should('contain.text', '1')
  })
})
