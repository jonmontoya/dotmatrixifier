var path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  // devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: 'build/'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /pdfmake\.min\.js/],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'},
          { loader: 'sass-loader'}
        ]
      },
      { test: /\.TTF$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
    ],
  },
  plugins: [
    new MinifyPlugin()
  ]
};
