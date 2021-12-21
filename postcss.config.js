module.exports = {
    plugins: [
        require('autoprefixer'),
        require('css-mqpacker'),
        require('postcss-nested'),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ],
};