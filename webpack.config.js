const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const extractPlugin = require('extract-text-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const path = require('path');
module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: '8000',
        inline: true,
        historyApiFallback: true
    },
    entry: {
        app: path.resolve(__dirname, 'src/js/main.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js'
    },
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: extractPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: { modules: false }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['es2015']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.html/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 50,
                    name: 'img/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new cleanPlugin(['dist']),
        new htmlPlugin({
            title: 'this is demo',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new extractPlugin('css/[name].css')
    ]
}