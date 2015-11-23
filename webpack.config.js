var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
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
                loaders: ['style', 'css']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};