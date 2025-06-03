const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qxs1tv',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
