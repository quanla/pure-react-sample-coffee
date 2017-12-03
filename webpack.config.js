
module.exports = {
    cache: true,
    // devtool: "eval",
    entry: ['babel-polyfill', "./src/client/client-loader.jsx"],
    output: {
        path: `${__dirname}/dist/js`,
        filename: "client-loader.js"
    },
    performance: {
        hints: false, // enum
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['latest', 'stage-0', "react"],
                }

            },
        ],
    },
    resolve: {
        // root: __dirname + "/src/js",
        extensions: ['.js', '.jsx']
    },
};

