var path = require('path')
var webpack = require('webpack')


module.exports = {
    entry: {
        app: './src/app.js',
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'js/[name]-bundle-[hash:5].js'
    },

    resolve: {
        alias: {
            // jquery$: path.resolve(__dirname, 'src/libs')
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
                        presets: ['@babel/preset-env'],
                        plugins: [["@babel/plugin-transform-runtime", { //参数意义 todo
                                "helpers": false,
                                "polyfill": false,
                                "regenerator": true,
                                "moduleName": "@babel/runtime"
                            }]
                        ]
                    }
                }
            }
        ]
    },

    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin()
    // ]
}

