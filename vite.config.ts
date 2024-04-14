import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "https://vue.0218.life",
    plugins: [
      vue(),
      vueJsx(),
      qiankun('vue', {
        useDevMode: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 8002,
      cors: true,
      origin: 'http://localhost:8002'
    }
  }
})
