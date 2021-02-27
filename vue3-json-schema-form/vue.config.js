// eslintt-disable-next-line @typescript-eslint/no-var-requires
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoEditorWebpackPlugin())
  },
}
