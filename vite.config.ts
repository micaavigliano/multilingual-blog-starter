import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'
//import mdx from '@mdx-js/rollup'

export default defineConfig({
  base: '/',
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    // {
    //   ... mdx({
    //     remarkPlugins: [
    //       remarkFrontmatter,
    //       [remarkMdxFrontmatter, { name:  'frontmatter' }],
    //     ],
    //     providerImportSource: '@mdx-js/react',
    //   }),
    //   enforce: 'pre',
    // },
    viteReact(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: { clientPort: 8888 },
  },
})