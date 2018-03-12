## webpack打包css
> 利用style-loader和css-loader打包解析css

- style-loader 用于加载css的style标签插入html
- css-loader 用于js中加载css
在src文件夹下新建css文件，建立index.css，并在app.js文件中import引入css文件，webpack执行打包，会把css代码写入到html内联css中
````
use: [
    {
        loader: 'style-loader',
    },
    {
        loader: 'css-loader'
    }
]
````

> 利用less-loader打包less

很多开发喜欢用sass less工具，因此需要新的loader进行编译成css，同时下载less-loader模块同时也要下载less模块
````
{
    test: /\.less$/,
    use: [
        {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                minimize: true
            }
        },
        {
            loader: 'less-loader'
        }
    ]
}
````

> 利用extract-text-webpack-plugin抽离css

随着项目越大，css文件越来越大，因此需要抽离合并css文件
````
const ExtractTextPlugin = require("extract-text-webpack-plugin") // extract css
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
});
{
    test: /\.less$/,
    use: extractLess.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            },
            {
                loader: 'less-loader'
            }
        ]
    })
}
plugins: [
    extractLess
]
````

> css module css模块化

有人提出css module为了css不被污染，因此对一个一个css类加一个模块前缀
````
{
    loader: 'css-loader',
    options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
    }
}
````

> css 内核自动补全功能 --- autoprefixer

配置时候写啥浏览器条件，不然不会触发autoprefixer
````
{
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('autoprefixer')({browsers: ['last 3 versions', '> 1%', 'ie >= 8']}),
        ]
    }
},
````

参考文档：
[extract css文档](https://github.com/webpack-contrib/extract-text-webpack-plugin)
[postcss文档](https://github.com/postcss/postcss-loader)
[postcss错误](https://github.com/postcss/postcss-loader/issues/204)