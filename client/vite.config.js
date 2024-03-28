import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: process.env.PORT || 5173, // ใช้ค่า PORT จาก .env หากมีหรือใช้ค่า 5173 เป็นค่าเริ่มต้น
    watch: {
      usePolling: true,
    },
  },
  define: {
    'import.meta.env': JSON.stringify(process.env),
  },
});