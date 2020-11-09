import path from 'path'
import ts from 'rollup-plugin-typescript2' // 解析ts
import serve from "rollup-plugin-serve"; // 本地服务
import { nodeResolve } from "@rollup/plugin-node-resolve"; // 解析第三方模块

export default {
  input: 'src/index.ts',
  output: {
    format: 'iife', // 打包成自运行函数
    file: path.resolve(__dirname, 'dist/bundle.js'),
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      openPage: '/public/index.html',
      contentBase: '',
      port: 10000
    })
  ]
}
