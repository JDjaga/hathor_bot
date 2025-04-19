import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 10001;

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      host: '0.0.0.0', // Required for Render to expose your server
      port, // Uses PORT from Render or 10001 locally
    },
  };
});
