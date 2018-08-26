const path = require('path');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');

module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },

  mode: 'development',
  devtool: 'sourcemap',

  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin()
  ]
};
