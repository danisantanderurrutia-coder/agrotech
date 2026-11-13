import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 7771,
    open: false,
    proxy: {
      '/api/hq': {
        target: 'http://127.0.0.1:7770',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hq/, '/api')
      },
      '/api/rewild': {
        target: 'http://127.0.0.1:7772',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rewild/, '/api')
      },
      '/api/predio': {
        target: 'http://127.0.0.1:7773',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/predio/, '/api')
      },
      '/api/cuenca': {
        target: 'http://127.0.0.1:7774',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cuenca/, '/api')
      },
      '/api/hub': {
        target: 'http://127.0.0.1:7777',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hub/, '/api')
      }
    }
  },
})
