import * as path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  const port = parseInt(process.env.VITE_PORT || '4000');
  return {
    plugins: [react()],
    server: {
      port,
      // https://vitejs.dev/config/#server-proxy
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    esbuild: {
      // configure this value when the browser version of the development environment is lower
      // minimum support es2015
      // https://esbuild.github.io/api/#target
      target: 'es2020',
      include: /\.(ts|tsx)$/,
    },
    build: {
      target: 'es2020',
      modulePreload: false,
      minify: true,
      sourcemap: false,
    },
  };
});
