const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=nowConfirmStatis,provinceCompare",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    }
  },
  publicPath: process.env.NODE_ENV === 'production'? './': '/'
})
