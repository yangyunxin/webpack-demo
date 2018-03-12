var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js',
        vendor: ['lodash']
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
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'src/libs'), path.resolve(__dirname, 'node_modules')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": {
                                    "browsers": ["last 2 versions", "ie >= 7"]
                                },
                            }]
                        ],
                        plugins: [["@babel/plugin-transform-runtime", {
                                "helpers": false,               // class extends语法
                                "polyfill": false,              // Map, Set, Promise 语法
                                "regenerator": true,            // generator，执行环境
                                "moduleName": "@babel/runtime" 
                            }]
                        ]
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: 'js/[name].js'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './test.html',
        })
    ]
}

