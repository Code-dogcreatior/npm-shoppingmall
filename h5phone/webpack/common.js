const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: './src/index'
    },
    output: {
        filename: 'index-[hash].js',
        path: path.resolve('./', 'build'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.htm',
            template: './src/index.htm',
            inject: true,
            hash: true
        }),
        new ProgressBarPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }]
                    ]
                }
            },
            exclude: path.resolve('./', 'node_modules'),
        },
        {
            test: /(.jpg)|(.png)|(.jpeg)$/,
            use: 'file-loader'
        },
        {
            test: /.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }
        ]
    },

    performance: {
        hints: 'warning',
        maxEntrypointSize: 500000000,
        maxAssetSize: 500000000
    }
};