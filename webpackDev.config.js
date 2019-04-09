var path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
var BUILD_DIR = path.resolve(__dirname, './prod/');
var APP_DIR = path.resolve(__dirname, './src/');

var config = {
  mode: "development",
  resolve: {
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  entry: {
    main : [
      'babel-polyfill',
      APP_DIR + '/App.jsx',
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname,'src','index.ejs'),
      filename: './index.html',
      favicon: './public/favicon.ico',
      hash: true
    })
  ],
  output: {
    path: BUILD_DIR,
    filename: 'index.bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module : {
    rules : [
      {
        test : /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url-loader', options: { limit: 10240 } },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]?[hash]' },
      { test: /(\.css|\.scss|\.sass)$/, loaders: 'style-loader'},
      { test: /(\.css|\.scss|\.sass)$/, loaders: 'css-loader'},
      { test: /(\.css|\.scss|\.sass)$/, loaders: 'sass-loader'}
    ]
  }
};
 
module.exports = config;