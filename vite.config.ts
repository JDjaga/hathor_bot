<<<<<<< HEAD
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load .env file based on `mode` (e.g., .env.development or .env.production)
  const env = loadEnv(mode, process.cwd(), '');

  const port = parseInt(env.VITE_PORT || '10001');
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 10001;
>>>>>>> c01c5ea0a2540a294c73f3f81c8bb420bdb8b8d5

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
