import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import asanaApi from './vite-plugin-asana-api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), asanaApi()],
})
