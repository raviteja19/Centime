const path=require('path');
const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackBundleAnalyzer=require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports={
    mode: 'development',
    entry:'./src/js/index.js',
    output:{
        path:path.join(__dirname,'/public'),
        publicPath: '/',
        filename:'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true,
        inline: true,
        port: 8086
     },
    module:{
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
        ]
    },
    plugins:[
        new CopyWebpackPlugin([
            {from :'./src/images',to:'./images'}
        ]),
        new HtmlWebpackPlugin({
            template: './public/index.html'
          })
        //   ,
        //   new WebpackBundleAnalyzer()
    ]
}