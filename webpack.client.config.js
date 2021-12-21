const { resolve } = require('path');

//for client
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports =
    //Client
    {
    entry: {
        main: resolve(__dirname, 'src/client/index.ts'),
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'index.bundle.js',
        path: resolve( __dirname, 'build/client')
    },
    devServer: {
        historyApiFallback: true,
        static: resolve(__dirname, './build/client'),
        open: true,
        compress: true,
        hot: true,
        port: 8081,
        devMiddleware: {
            writeToDisk: true
        },
    },
    module:{
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        // options: { sourceMap: true}
                    }
                ]
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        // options: { sourceMap: true}
                    },
                    {
                        loader: 'sass-loader',
                        // options: { sourceMap: true}
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    // name: '[name].[ext]',
                    outputPath: './imaaaages'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             limit: 4096,
                //             name: './fonts/[name].[ext]?[hash]'
                //             // mimetype: 'application/font-woff',
                //             // publicPath: '../'
                //         }
                //     }
                // ]
            },
            {
                test: /\.txt$/i,
                loader: "file-loader",
                options: {
                    outputPath: './'
                }
            },
            {
                test: /\.mp3$/i,
                loader: "file-loader",
                options: {
                    outputPath: './'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/client/index.html'
        }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        // }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "./src/client/static", to: 'static'},
            ],
        }),
    ],
    resolve:{
        modules:[
            resolve('./src/client/**/*.*'),
            resolve('./node_modules')
        ],
        extensions: [".tsx",".ts", ".js"]
    },
    target: 'web',
    mode: 'development',
}