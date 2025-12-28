import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// Konfigurasi Vite agar bisa diakses dari luar (VS Code Dev Tunnels / ngrok)
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],

  server: {
    // host: true membuat Vite bind ke 0.0.0.0
    // Ini wajib agar port forwarding VS Code tidak error 502
    host: true,

    // Port harus sama dengan yang di-forward di VS Code
    port: 3000,

    // Opsional, tapi membantu jika port bentrok
    strictPort: true,
  },
})
