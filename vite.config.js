import { defineConfig } from 'vite'

export default defineConfig({
  // ใส่ชื่อ Repository ของคุณในช่อง base เพื่อให้ Path ไฟล์ถูกต้องเมื่ออยู่บน GitHub Pages
  base: '/ThunderSpike/', 
  build: {
    outDir: 'dist',
  }
})