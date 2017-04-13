const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const ManifestPlugin = require( 'webpack-manifest-plugin' );
const path = require( 'path' );
const ROOT_PATH  = path.resolve( __dirname, '../' );
const BUILD_PATH = path.resolve( ROOT_PATH, 'public/assets' );
const SCSS_PATH   = path.resolve( ROOT_PATH, 'resources/assets/sass' );

let mainCss = new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true } );

let config = {
    // Entries settings
    entry: {
        'custom': [
            path.resolve( SCSS_PATH, 'custom.scss' )
        ]
    },

    // Output Settings
    output: {
        path: BUILD_PATH,
        filename: 'css/[name].min.css?[chunkhash:10]',
        chunkFilename: 'css/[name].css'
    },

    module: {
        loaders: [
        {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },

        // https://github.com/webpack/file-loader
        // Copy images from resources to public.
        // This is for images in laravel blade template, we are not using Webpack to bundle laravel blade template.
        // http://stackoverflow.com/a/35177460
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

        

        // Wrap css by entry name
        new ExtractTextPlugin('css/[name].css')
    ],
    devtool: 'source-map'
};

module.exports = config;
