# ServeRest — Testes Automatizados E2E (Cypress)

Suíte de testes automatizados desenvolvida com **Cypress + JavaScript**, cobrindo:

- **3 cenários E2E de Frontend** — [https://front.serverest.dev](https://front.serverest.dev)
- **3 cenários automatizados de API** — [https://serverest.dev](https://serverest.dev)

## 🧱 Estrutura do projeto

```
cypress/
├── e2e/
│   ├── frontend/
│   │   ├── cadastro-usuario.cy.js     # Cadastro de usuário com sucesso
│   │   ├── login-e-carrinho.cy.js     # Login + adicionar produto ao carrinho
│   │   └── login-invalido.cy.js       # Login com credenciais inválidas
│   └── api/
│       ├── login.cy.js                # POST /login
│       ├── cadastro-usuario.cy.js     # POST /usuarios (+ limpeza via DELETE)
│       └── listar-produtos.cy.js      # GET /produtos (validação de contrato)
├── pageObjects/                        # Page Object Model (Frontend)
│   ├── LoginPage.js
│   ├── CadastroPage.js
│   └── HomePage.js
├── support/
│   ├── commands.js                     # Comandos customizados (UI + API)
│   └── e2e.js
└── fixtures/
    └── usuario.json
```

## 🎯 Decisões de projeto / boas práticas adotadas

- **Page Object Model (POM)** para os testes de Frontend, isolando seletores e
  ações de UI da lógica dos testes — facilita manutenção quando o front mudar.
- **Massa de dados dinâmica** com `@faker-js/faker` em todos os cenários,
  evitando testes flakey por dependência de dados fixos/compartilhados
  (ex.: e-mail já cadastrado).
- **Setup via API dentro dos testes de UI** (`cy.apiCriarUsuario`): ao invés de
  cadastrar um usuário pela interface só para depois testar o login, o usuário
  é criado direto via API no `before()`, tornando o teste de UI mais rápido e
  focado no que realmente precisa validar (login + carrinho).
- **Limpeza de massa (teardown)** no cenário de API de cadastro — o usuário
  criado é removido via `DELETE /usuarios/:_id` ao final do teste.
- **Validação de contrato/schema** no `GET /produtos`, garantindo que a API
  não quebre o formato esperado da resposta.
- **`data-testid`** como estratégia de seletor no Frontend, evitando
  acoplamento com classes de estilo (CSS) que podem mudar sem afetar o
  comportamento da aplicação.
- **Retries automáticos** configurados no `cypress.config.js` (`runMode: 2`)
  para reduzir falsos negativos em ambiente de CI, sem mascarar falhas reais.
- **CI com GitHub Actions** (`.github/workflows/cypress.yml`): a suíte roda
  automaticamente a cada push/PR na branch `main`.

## ▶️ Como executar

### Pré-requisitos
- Node.js 18+
- NPM

### Instalação
```bash
npm install
```

### Executar todos os testes (modo headless)
```bash
npm run test:all
```

### Executar apenas os testes de Frontend
```bash
npm run test:frontend
```

### Executar apenas os testes de API
```bash
npm run test:api
```

### Abrir o Cypress em modo interativo (Test Runner)
```bash
npm run cy:open
```

## 📋 Cenários cobertos

### Frontend (front.serverest.dev)
1. **Cadastro de usuário com sucesso**, validando redirecionamento para `/home`
   e exibição da mensagem de confirmação.
2. **Login com sucesso** (usuário criado via API) **e adição de produto ao
   carrinho**, validando o contador do carrinho.
3. **Login com credenciais inválidas**, validando a mensagem de erro exibida
   e a permanência na tela de login.

### API (serverest.dev)
1. `POST /login` — autenticação com sucesso, validando status `200` e o
   token de autorização (`Bearer ...`) retornado.
2. `POST /usuarios` — cadastro de usuário com sucesso, validando o contrato
   da resposta (`message`, `_id`) e removendo a massa criada (`DELETE`).
3. `GET /produtos` — listagem de produtos, validando status `200` e o
   contrato (schema) de cada item retornado.

## 👤 Autor

Adir Leite de Souza — QA Automation
