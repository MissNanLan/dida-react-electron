const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    // 入口文件
    entry: "./app/static/dialog/index.js",
    // 出口文件
    output: {
        path: path.join(__dirname, '../app/dist/dialog'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/static/dialog/index.html",
            filename: "./index.html"
        })
    ]
};