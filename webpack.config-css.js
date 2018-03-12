var webpack = require('webpack')
var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html 
const ExtractTextPlugin = require("extract-text-webpack-plugin") // extract css
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
});

module.exports = {
    entry: {
        app: './src/app.js',
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'js/[name]-bundle.js'
    },

    resolve: {
        alias: {

        }
    },

    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLess.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                //minimize: true
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({browsers: ['last 3 versions', '> 1%', 'ie >= 8']}),
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        },
                        
                    ]
                })
            }
        ]
    },

    plugins: [
        extractLess
    ]
}