const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function rootPath(dir = '') { return path.resolve(__dirname, './', dir); }
function appPath(dir = '') { return rootPath('app/' + dir); }
function testsPath(dir = '') { return rootPath('test/' + dir); }
function outPath(dir = '') { return rootPath('dist/' + dir); }

module.exports = {
    context: rootPath(),
    mode: 'development',
    devServer: {
        port: 9030,
        hot: true,
        overlay: true,
        disableHostCheck: true // https://github.com/webpack/webpack-dev-server/issues/1604
    },
    devtool: 'source-map',
    entry: appPath('index.ts'),
    optimization: {
        minimize: false,
        sideEffects: true,
        noEmitOnErrors: true,
        concatenateModules: true
    },
    output: {
        path: outPath(''),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [rootPath(), rootPath('node_modules')]
    },
    plugins: [
        new CleanWebpackPlugin([
            outPath()
        ]),
        new HtmlWebpackPlugin({
            chunksSortMode: 'dependency',
            template: './app/index.ejs'
        }),
        new webpack.HotModuleReplacementPlugin() 
    ],
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            include: [
                appPath()
            ],
            options: {
                onlyCompileBundledFiles: true
            }
        }]
    }
}