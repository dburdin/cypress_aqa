import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
