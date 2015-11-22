module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.css/, loaders: ['style', 'css']}
        ]

    }
};