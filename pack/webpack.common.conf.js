const path = require('path')
const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.development.conf')

const merge = require('webpack-merge')

var generateConfig = env => {
    return {
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
                    use: [
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['transform-runtime']
                        }
                    ]
                }
            ]
        }
    }
}

module.exports = (env) => {
    let config = env === 'production'
    ? productionConfig
    : developmentConfig

    return merge(generateConfig(env), config)
}



