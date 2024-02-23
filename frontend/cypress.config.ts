import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  component: {
    specPattern: 'cypress/components/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
      }
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      //on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))

      return config
    },
  },
});
