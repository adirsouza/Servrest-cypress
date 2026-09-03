const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // URL padrão utilizada pelos testes de Frontend (E2E de UI)
  e2e: {
    baseUrl: "https://front.serverest.dev",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      // URL base da API, usada pelos testes em cypress/e2e/api via cy.request()
      apiUrl: "https://serverest.dev"
    },
    setupNodeEvents(on, config) {
      return config;
    }
  }
});
