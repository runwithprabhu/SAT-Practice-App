import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://text.pollinations.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/openai/v1/chat/completions'),
        headers: {
          'Origin': 'https://text.pollinations.ai',
          'Referer': 'https://text.pollinations.ai/',
        },
      },
    },
  },
})
