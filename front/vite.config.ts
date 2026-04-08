import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Номер 7777777 недопустим (порт ≤ 65535); 7777 — запоминающийся свободный порт
    port: 7777,
    strictPort: true,
  },
})
