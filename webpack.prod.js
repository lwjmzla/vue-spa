const merge = require('webpack-merge');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin'); //压缩JS代码
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']), //每次打包先清除的目录
        new uglify({
            sourceMap: true
        }),    //压缩JS代码
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common', // 指定公共 bundle 的名称。
        //     //chunks:['index','another'],//重要：这里要设置trunk入口
        //     minChunks:3
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
            //filename: 'assets/js/[name].bundle-[chunkhash:3].js', 
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest"
        })
    ],
});