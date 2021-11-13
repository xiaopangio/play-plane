const path = require('path')
module.exports = {
    entry: path.resolve(__dirname, './main.js'),//打包入口路径
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist'),//打包结果路径
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'assets/',
                        publicPath: ''
                    }
                }]
            }
        ]
    }
}