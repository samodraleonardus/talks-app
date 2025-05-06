import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    slowTestThreshold: 2000,
    setupFiles: './vitest.setup.js',
  },
});
