import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load .env file based on `mode` (e.g., .env.development or .env.production)
  const env = loadEnv(mode, process.cwd(), '');

  const port = parseInt(env.VITE_PORT || '10001');

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
