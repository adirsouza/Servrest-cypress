const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      apiUrl: 'https://serverest.dev'
    }
  }
})
