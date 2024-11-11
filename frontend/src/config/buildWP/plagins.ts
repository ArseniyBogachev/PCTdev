
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import webpack from 'webpack';


export const plugins = ({paths, env}: any): any[] => [
    new HtmlWebpackPlugin({template: paths.html}),
    new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new Dotenv({
        path: paths.dotenv,
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.mode),
    }),
]