import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Simple working Vite config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
