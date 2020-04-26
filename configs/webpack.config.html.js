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
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader:"babel-loader",
					options:{
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							{"plugins": ["@babel/plugin-proposal-class-properties"]} //这句很重要 不然箭头函数出错
						], 
					}
				},
			},
			{
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/, //css打包 路径在plugins里
				use: [
					{ loader: "style-loader"} ,
					{ loader: "css-loader", options: { url: false, sourceMap: true } },
					{ loader: "sass-loader", options: { sourceMap: true } }
				],
				exclude: /node_modules/,
			},
			{
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                options:{
                    publicPath:'/'
                }
            },
			{
				test: /\.less$/,
				use: [
					 { loader: "style-loader"} ,
				  {
					loader: 'css-loader',
					options: {
					  sourceMap: true,
					  importLoaders: 1
					}
				  },
				  {
					loader: 'less-loader',
					options: {
					  modifyVars: {
						'primary-color': '#108ee9'
					  },
					  javascriptEnabled: true
					}
				  }
				]
			  },
			   // WOFF Font
			   {
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: {
				  loader: 'url-loader',
				  options: {
					limit: 10000,
					mimetype: 'application/font-woff'
				  }
				}
			  },
			  // WOFF2 Font
			  {
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: {
				  loader: 'url-loader',
				  options: {
					limit: 10000,
					mimetype: 'application/font-woff'
				  }
				}
			  },
			  // TTF Font
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
			  // SVG Font
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
			  // Common Image Formats
			  {
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: 'url-loader'
			  }
		],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/static/dialog/index.html",
            filename: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};