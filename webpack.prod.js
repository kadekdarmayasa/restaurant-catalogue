const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const ImageMinizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: 'asset',
      },
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinizerPlugin({
        minimizer: {
          implementation: ImageMinizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 50,
              },
            },
          },
        },
      }),
    ],
  },
});
