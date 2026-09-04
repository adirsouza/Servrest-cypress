import LoginPage from '../../pageObjects/LoginPage'

describe('Frontend | Login Inválido', () => {
  it('exibe mensagem de erro ao tentar logar com credenciais inválidas', () => {
    LoginPage.visitar()
    LoginPage.fazerLogin('usuario.inexistente@example.com', 'senhaErrada123')

    LoginPage.elements.mensagemAlerta()
      .should('be.visible')
      .and('contain.text', 'inválidos')

    cy.url().should('include', '/login')
  })
})
