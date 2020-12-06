const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginPug = require('html-webpack-pug-plugin');
const fs = require('fs')

let templates = [];
let dir = 'src';
let files = fs.readdirSync(dir);

files.forEach( file => {
    if (file.match(/\.pug$/)) {
        let filename = file.substring(0, file.length - 4);
        templates.push(
            new HtmlWebpackPlugin({
                template: dir + "/" + filename + ".pug",
                filename: filename + ".html"
            })
        )
    }
})

/*
module.exports = {
    entry: './src/public/javascripts/index.js',
    output: {
        path:  path.resolve(__dirname, "src/public/javascripts"),
        filename: "[name].bundle.js"
    },
    
    devtool: 'cheap-module-source-map',
    mode: "development"
}*/

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: __dirname + "/dist",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    "raw-loader",
                    "pug-html-loader"
                ]
            }
        ]
    },
    plugin: [
        ...templates,
        new HtmlWebpackPluginPug()
    ]
}