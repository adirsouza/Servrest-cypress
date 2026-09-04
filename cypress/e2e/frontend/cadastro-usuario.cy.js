import { faker } from '@faker-js/faker'
import CadastroPage from '../../pageObjects/CadastroPage'

describe('Frontend | Cadastro de Usuário', () => {
  it('cadastra um novo usuário com sucesso e redireciona pra Home', () => {
    const novoUsuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password({ length: 10 }),
      administrador: false
    }

    CadastroPage.visitar()
    CadastroPage.preencherFormulario(novoUsuario)
    CadastroPage.cadastrar()

    // sem marcar administrador, o cadastro cai direto na home do cliente
    cy.url().should('include', '/home')
    cy.get('[role=alert]').should('be.visible').and('contain.text', 'sucesso')
  })
})
