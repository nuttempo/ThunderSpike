import { defineConfig } from 'vite'

export default defineConfig({
  base: '/ThunderSpike/', // ต้องมีเครื่องหมาย / ปิดท้ายแบบนี้
  build: {
    outDir: 'dist',
  }
})
