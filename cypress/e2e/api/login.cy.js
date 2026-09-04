import { faker } from '@faker-js/faker'

describe('API | POST /login', () => {
  let usuario

  before(() => {
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

  it('autentica com sucesso e devolve um token de autorização', () => {
    cy.apiLogin(usuario.email, usuario.password).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Login realizado com sucesso')
      expect(response.body.authorization).to.match(/^Bearer\s/)
    })
  })
})
