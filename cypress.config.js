import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://example.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
  },
});
