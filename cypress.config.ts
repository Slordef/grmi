import dotenv from 'dotenv';
import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            dotenv.config();
            config.env = process.env;
            return config;
        },
        specPattern: '**/*.cy.ts'
    },
});
