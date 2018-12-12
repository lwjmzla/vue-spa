const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
        // open: true, //运行就自动打开页面
        port: 8888,
        // contentBase: './src',
        // publicPath: '/'
        hot:true,
        host:'0.0.0.0'
        //contentBase: './dist'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
});