import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://us-central1-yannick-djoa.cloudfunctions.net/backend',
        secure: false,
      },
    },
  },
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});
