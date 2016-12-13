var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 将css单独打包

module.exports = {
    entry : {
        'app' : './source/app.js'
    },
    output : {
        path : './dist/',
        filename : '[name].js'
    },
    module : {
        loaders : [
            {test:/\.js$/,exclude:/node_modules/,loader:'babel',query:{presets:['es2015','react']}},
            {test: /\.css$/,exclude:/node_modules/,loader: 'style!css'},
            {test: /\.scss$/,exclude:/node_modules/,loader: ExtractTextPlugin.extract('style', 'css!sass')},
            {test: /\.(png|jpg)$/,loader: 'url-loader?limit=100000'}
        ],
    },
    resolve: {
        extensions: ['', '.js','.jsx', '.json', '.scss','.css']
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
}
