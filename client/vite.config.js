import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3050',
        secure: false,
      },
    },
  },
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});
