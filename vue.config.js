const px2rem = require('postcss-px2rem')
// 配置postcs-px2rem
const postcss = px2rem({
  remUnit: 37.5  //将设计稿设计成10等分
})
module.exports = {
    runtimeCompiler: true,
    lintOnSave: false,
    css: { // 添加postcss配置
        loaderOptions: {
          postcss: {
            plugins: [
              postcss
            ]
          }
        }
    },
    devServer: {
      port: 8787,//运行端口号
      open: true, // 自动打开浏览器
      quiet: true, // 不做太多日志输出
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          ws: true,
          changeOrigin: true,
          //重写字符串为空
          pathRewrite:{
            '^/api': ''
          }
        },
      }
    },
}
