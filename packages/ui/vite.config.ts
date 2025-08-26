import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AntdReactPlus',
      fileName: 'index',
    },
    rollupOptions: {
      // 排除外部依赖，避免打包到组件库中
      external: ['react', 'react-dom', 'antd'],
      output: {
        // 提供全局变量名称，以便在 UMD 模式下可以通过 window 访问
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd'
        }
      }
    }
  }
})