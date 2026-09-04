import { faker } from '@faker-js/faker'

describe('API | POST /usuarios', () => {
  it('cadastra um usuário, valida o contrato da resposta e apaga a massa criada', () => {
    const usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
      administrador: 'false'
    }

    cy.apiCriarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      expect(response.body._id).to.be.a('string').and.have.length(16)

      // limpo o usuário criado pra não ficar sujeira acumulando no ambiente
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/usuarios/${response.body._id}`
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200)
        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')
      })
    })
  })
})
