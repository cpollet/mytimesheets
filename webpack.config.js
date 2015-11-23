var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                loaders: ['style', 'css']
            },
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};