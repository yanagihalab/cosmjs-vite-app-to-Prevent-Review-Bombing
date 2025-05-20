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
    host: '0.0.0.0',                 // Renderで必須
    port: process.env.PORT || 5173,  // PORT環境変数を使用
    strictPort: true,
    allowedHosts: [
      'cosmjs-vite-app-to-prevent-review-bombing.onrender.com'
    ]
  }
});
