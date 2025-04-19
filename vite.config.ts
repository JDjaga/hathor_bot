import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 10001;

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
      esbuildOptions: {
        target: 'es2020',
        platform: 'browser',
        supported: {
          'top-level-await': true
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port,
      allowedHosts: ['hathor-bot.onrender.com'],
      hmr: {
        timeout: 5000
      }
    },
    build: {
      target: 'es2020',
      sourcemap: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    preview: {
      port,
      host: '0.0.0.0'
    }
  };
});
