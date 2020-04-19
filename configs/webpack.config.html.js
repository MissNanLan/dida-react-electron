const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack');

module.exports = {
    // 入口文件
    target: 'electron-renderer',
    entry: "./app/static/dialog/index.js",
    // 出口文件
    output: {
        path: path.join(__dirname, '../app/dist/dialog'),
        filename: 'index.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '../app/dist/'),
        compress: true,
        port: 9000,
        hot:true  
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
            },{
                test: /\.global\.less$/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'less-loader',
                    options: {
                      modifyVars: {
                        'primary-color': '#61BFAD'
                      },
                      javascriptEnabled: true
                    }
                  }
                ]
              },{
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream'
                  }
                }
              },{
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                  }
                }
              },{
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                  }
                }
              },
              {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream'
                  }
                }
              },
              // EOT Font
              {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader'
              },
              {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                  }
                }
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/static/dialog/index.html",
            filename: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};