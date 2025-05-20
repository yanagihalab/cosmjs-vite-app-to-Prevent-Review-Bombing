// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',              // Render上で必須
    port: process.env.PORT || 5173, // Renderが指定したPORTを使う
    strictPort: true,
    allowedHosts: 'all' // すべてのホストを許可
  }
});
