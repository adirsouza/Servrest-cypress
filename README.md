# ServeRest — Testes Automatizados E2E (Cypress)

 cenários E2E de Frontend — [https://front.serverest.dev](https://front.serverest.dev)
 cenários automatizados de API — [https://serverest.dev](https://serverest.dev)


Cenários cobertos

Frontend (front.serverest.dev)
1. **Cadastro de usuário com sucesso**, validando redirecionamento para `/home`
   e exibição da mensagem de confirmação.
2. **Login com sucesso** (usuário criado via API) **e adição de produto ao
   carrinho**, validando o contador do carrinho.
3. **Login com credenciais inválidas**, validando a mensagem de erro exibida
   e a permanência na tela de login.

 API (serverest.dev)
1. `POST /login` — autenticação com sucesso, validando status `200` e o
   token de autorização (`Bearer ...`) retornado.
2. `POST /usuarios` — cadastro de usuário com sucesso, validando o contrato
   da resposta (`message`, `_id`) e removendo a massa criada (`DELETE`).
3. `GET /produtos` — listagem de produtos, validando status `200` e o
   contrato (schema) de cada item retornado.

## 👤 Autor

Adir Leite de Souza — QA Automation
