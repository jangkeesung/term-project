const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/term": {
        target: "http://localhost:80"
      }
    }
  }
})
