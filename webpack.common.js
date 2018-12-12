const htmlWebpackPlugin = require('html-webpack-plugin');
//const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const path = require('path');
// const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const uglify = require('uglifyjs-webpack-plugin'); //压缩JS代码
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //CSS文件单独打包插件

function resolve (dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    //entry: path.resolve(__dirname, './src/js/main.js'),
    entry: {
        vendor: ['babel-polyfill', 'vue', 'vue-router', 'vuex'],// 这种方式就算你没引入 也自动打包进去了。
        app: path.resolve(__dirname, './src/main.js')
    },
    output: {
        path: __dirname + '/dist/',
        filename: 'assets/js/[name].js', //设置 JS 的生成路径
        //publicPath: './' //解决基础资源  路径问题       影响html引入的js路径问题
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: 'assets/css/[name]_[hash:8].css' //设置 css的生成路径
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js', // import vue from 'vue'  默认引入了vue.common.js.. 是错的
            '@': resolve('src'),
            'common': resolve('src/common'),
            'components': resolve('src/components'),
            'api': resolve('src/api'),
            'mock': resolve('src/mock'),
            'pages': resolve('src/pages'),
            'filters': resolve('src/filters')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
                //options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../../', //处理url()时，当前的路径是assets/css/ 而图片的路径是assets/img/ 路径变成assets/css/assets/img/， 用 ../../处理前面的，再拼接后面
                    use: [{
                        loader: 'css-loader',
                        options: {
                            //'module': true,
                            minimize: false, // cssnano 压缩
                            //importLoaders: 2, // 针对@import 的资源之前」有多少个 loader。 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                                //文件名   类名   编译出来的类名用的
                        }
                    }]
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../../', //处理url()时，当前的路径是assets/css/ 而图片的路径是assets/img/ 路径变成assets/css/assets/img/， 用 ../../处理前面的，再拼接后面
                    use: [{
                        loader: 'css-loader',
                        options: {
                            //'module': true,
                            minimize: false, // cssnano 压缩
                            //importLoaders: 2, // 针对@import 的资源之前」有多少个 loader。 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                                //文件名   类名   编译出来的类名用的
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            //sourceMap: true,
                            config: {
                                path: 'postcss.config.js' // 这个得在项目根目录创建此文件
                            }
                        }
                    }, 'stylus-loader']
                })
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'assets/img/[name]_[hash:8].[ext]' //设置 图片的生成路径
                        }
                    }] //'image-webpack-loader' //这个上线项目才用  打包图片耗费时间    image-webpack-loader 压缩图片用
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name]_[hash:8].[ext]' //设置 字体图标的生成路径
                    }
                }]
            }
        ]
    }
};