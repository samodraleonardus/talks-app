import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    slowTestThreshold: 2000,
    setupFiles: './vitest.setup.js',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'], // hanya file test
    exclude: ['**/*.stories.*', 'node_modules', 'dist'], // abaikan file storybook
  },
});
