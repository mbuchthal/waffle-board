import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/lib'],
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      '@waffle-charts': path.resolve(__dirname, '../waffle-charts/src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'WaffleBoard',
      formats: ['es', 'umd'],
      fileName: (format) => `waffle-board.${format}.js`
    },
    rollupOptions: {
      // Externalize deps that stay in the consumer app
      external: [
        'react',
        'react-dom',
        'react-grid-layout',
        '@waffle-charts/types',
        'waffle-batch' // Externalize to avoid bundling issues
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-grid-layout': 'ReactGridLayout'
        }
      }
    },
    // Output to a separate folder or standard dist? 
    // Standard convention for libs which also have a demo is often `lib/dist` or similar, 
    // but `dist` is fine if we separate the demo build.
    // Let's us `dist-lib` for now to avoid overwriting the gh-pages demo.
    outDir: 'dist-lib'
  }
})
