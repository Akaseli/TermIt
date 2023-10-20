const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    open: true
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    //proxy for api
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins : [
    new ReactRefreshWebpackPlugin()
  ]
}