import { defineConfig } from 'cypress';
import baseConfig from './cypress.config.js';

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://qauto2.forstudy.space',
    env: {
      login: 'bpitt@gmail.com',
      password: 'qqq123QQQ',
    },
  },
});
