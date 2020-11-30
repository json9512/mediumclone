const path = require('path');

module.exports = {
    entry: './src/public/javascripts/editor.js',
    output: {
        path:  path.resolve(__dirname, "src/public/javascripts"),
        filename: "[name].bundle.js"
    },
    devtool: 'cheap-module-source-map',
    mode: "development"
}