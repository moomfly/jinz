const path = require("path");

const CompressionPlugin = require("compression-webpack-plugin");

const name = process.env.VUE_APP_TITLE; // 网页标题

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/web/" : "/web/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0",
    port: 7011,
    open: false,
    https: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `https://api.jinzancn.com`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
    disableHostCheck: true,
  },
  configureWebpack: {
    name,
    resolve: {
      //别名
      alias: {
        "@": path.resolve(__dirname, "./src"),
        Assets: "@/assets",
        Components: "@/components",
        Views: "@/views",
        Api: "@/api",
      },
    },
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|html)?$/i, // 压缩文件格式
        filename: "[path].gz[query]", // 压缩后的文件名
        algorithm: "gzip", // 使用gzip压缩
        threshold: 10240, // 只处理大于 10kB 的文件
        minRatio: 0.8, //压缩率小于 0.8 的文件不会被压缩
        deleteOriginalAssets: false, // 是否删除原始文件
      }),
    ],
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
