import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    Vue(),
    process.env.NODE_ENV === 'production' &&
      viteStaticCopy({
        targets: [
          {
            src: 'static/data.json',
            dest: 'static'
          }
        ]
      }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src'],
      vueTemplate: true
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [AntDesignVueResolver()],
      dirs: ['src'],
      dts: 'src/components.d.ts'
    })
  ]
})
