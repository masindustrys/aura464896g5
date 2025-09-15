const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const glob = require('glob');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      app: './src/assets/js/app.js',
      styles: './src/assets/styles/app.scss'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'js/[name].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'src/assets/images',
            to: 'images',
            noErrorOnMissing: true
          },
          {
            from: 'src/locales',
            to: '../locales',
            noErrorOnMissing: true
          },
          {
            from: 'src/views',
            to: '../views',
            noErrorOnMissing: true
          }
        ]
      })
    ],
    optimization: {
      minimizer: [
        '...',
        new CssMinimizerPlugin()
      ]
    },
    resolve: {
      extensions: ['.js', '.scss', '.css']
    },
    devtool: isProduction ? false : 'source-map'
  };
};