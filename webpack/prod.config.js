const webpack = require('webpack');
const path = require('path');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: {kexcel: './ts/Workbook'},
    resolve: {
        extensions: ['', '.ts', '.json'],
        modules: ['ts', 'node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {root: path.dirname(module.parent.filename)}),
        new ForkCheckerPlugin(),
        new UglifyJsPlugin({
            beautify: true,
            mangle: false,
            compress: false,
            comments: true
            /*
            beautify: false, //prod
            mangle: {screw_ie8: true, keep_fnames: true}, //prod
            compress: {screw_ie8: true}, //prod
            comments: false //prod*/
        })
    ],
    debug: false,
    devtool: 'source-map',
    output: {
        path: 'dist',
        /*filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'*/
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js',
        library: "kexcel",
        libraryTarget: 'commonjs2'
    },
    externals: [
        nodeExternals()
    ],
    node: {
        __dirname: true
    }
    /*tslint: {
     emitErrors: true,
     failOnHint: true,
     resourcePath: 'src'
     },*/


};