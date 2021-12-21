const { resolve } = require('path');

module.exports =
    //Server
    {
        entry: {
            main: resolve(__dirname, 'src/server/server.ts'),
        },
        devtool: 'inline-source-map',
        output: {
            filename: 'server.js',
            path: resolve( __dirname, 'build/server')
        },
        module:{
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                }
            ]
        },
        resolve:{
            // modules:[
            //     // resolve('./client'),
            //     resolve('./node_modules')
            // ],
            extensions: [".tsx",".ts", ".js"]
        },
        target: 'node',
        mode: 'development',
    }