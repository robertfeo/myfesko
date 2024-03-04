module.exports = {
    // Other configurations...
    module: {
        rules: [
            {
                test: /\.(handlebars|hbs)$/,
                loader: 'handlebars-loader',
                // Optional: configuration options for the loader
            },
        ],
    },
};
