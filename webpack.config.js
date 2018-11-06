const path = require('path');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, EnvironmentPlugin } = require('webpack');

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
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new EnvironmentPlugin({
      ACCEPTANCE: false
    })
  ]
};
