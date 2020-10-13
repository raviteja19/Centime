const path = require('path');
const webpack = require('webpack');
// const { WebpackWarPlugin } = require('webpack-war-plugin');
const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackBundleAnalyzer=require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  devtool: 'eval',
  entry:'./src/js/index.js',
    output:{
        path:path.join(__dirname,'/public'),
        publicPath: '/',
        filename:'bundle.js'
    },
    optimization: {
             splitChunks: {
               chunks: 'all',
             },
           },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
],
  devServer: {
	  historyApiFallback: true,
	  contentBase: './',
	  hot: true,
      inline: true,
      port: 8086
   },
   resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules:[
      {
          test:/\.js$/,
          exclude:/node_modules/,
          use:{
              loader:"babel-loader"
          }
      },
      {
          test:/\.css$/,
          use:['style-loader','css-loader']
      },
      {
          test:/\.(png|jp(e*)g|svg|gif)$/,
          use:[
              {
                  loader:'url-loader',
                  options:{
                      limit:8000,
                      name:'images/[hash]-[name].[ext]'
                  }
              }
          ]
      }
  ],
    // loaders: [
    //     {
    //         test: /\.jsx?$/,
    //         exclude: /node_modules/,
    //         loader: 'babel-loader',
    //         query: {
    //            presets: ['es2015', 'react']
    //         }
    //      }
    // ],
  },
  plugins:[
    new CopyWebpackPlugin([
        {from :'./src/images',to:'./images'}
    ]),
    new HtmlWebpackPlugin({
        template: './public/index.html'
      })
      // ,
      // new WebpackBundleAnalyzer()
]
// optimization: {
//   splitChunks: {
//     cacheGroups:{
//       vendors:{
//         test:/[\\/]node_modules[\\/]/,
//         name:'bundle',
//         chunks:'all'
//       }
//     }
//   }
// }
};