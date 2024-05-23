import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import qiankun from 'vite-plugin-qiankun'
import UnoCSS from 'unocss/vite'
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "./",
    plugins: [
      vue(),
      qiankun('vue', {
        useDevMode: true
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      UnoCSS(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 8002,
      cors: true,
      origin: 'http://localhost:8002',
      proxy: {
        '/api': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          // rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
