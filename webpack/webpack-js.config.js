const webpack = require( 'webpack' );
const ManifestPlugin = require( 'webpack-manifest-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const path = require( 'path' );
const ROOT_PATH  = path.resolve( __dirname, '../' );
const APP_PATH   = path.resolve( ROOT_PATH, 'resources/assets/js' );
const SCSS_PATH   = path.resolve( ROOT_PATH, 'resources/assets/sass' );
const BUILD_PATH = path.resolve( ROOT_PATH, 'public/assets' );

let mainCss = new ExtractTextPlugin( {filename: `css/[name].min.css?[chunkhash:10]`,
    allChunks: true
} );

let config = {
    // Entries settings
    entry: {
        'homepage': path.resolve( APP_PATH, 'homepage.js' )
    },

    // Output Settings
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].js?[chunkhash:10]',
        chunkFilename: 'js/[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file?name=[path][name].[ext]?[hash:10]&context=./resources/assets'
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader' }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [

        // https://github.com/danethurber/webpack-manifest-plugin
        new ManifestPlugin({
            publicPath: '/assets/',
            stripSrc: '//'
        }),

        new webpack.ProvidePlugin( {
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        }),

        // Wrap css by entry name
        new ExtractTextPlugin('css/[name].css?[chunkhash:10]')
    ],
    devtool: 'source-map'
};

module.exports = config;
