const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

plugins.push(new ReactRefreshWebpackPlugin())

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dev_build'
  },
  watch: true,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dev_build')
  }
})
