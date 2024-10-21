import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': "http://localhost:8000/api/v1",
    },
  },
  plugins: [react()],
  test:{
    globals:true,
    envirnoment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
})
