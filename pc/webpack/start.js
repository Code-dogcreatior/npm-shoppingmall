const { merge } = require('webpack-merge');
const common = require('./common.js');
module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: './build',
        host: '127.0.0.1',
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/index.htm' }
            ]
        },
    }
})