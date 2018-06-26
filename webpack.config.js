const path = require("path")
const webpack = require("webpack")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HTMLPlugin = require("html-webpack-plugin")

const isDev = process.env.NODE_ENV === "development"

const config = {
  target: "web",
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          "stylus-loader",
        ]
      },
      {
        test: /\.(jpg|jpeg|svg|png|bmp|gif|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name].[ext]"
            }
          }
        ],
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? "'development'" : "'production'"
      }
    }),
    new HTMLPlugin({
      inject: true,
      favicon: "./src/assets/image/favicon.ico"
    })
  ]
}

if (isDev) {
  config.devtool = "#cheap-module-eval-source-map",
  config.devServer = {
    port: 8000,
    host: "0.0.0.0",
    overlay: {
      errors: true
    },
    hot: true
  }
  config.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config