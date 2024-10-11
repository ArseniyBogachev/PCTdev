
import webpack from 'webpack'
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
const dn = new Date();

type Mode = 'development' | 'production' | 'none'

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: any) => {

    const isDev: boolean = env.mode === 'development'

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: `bundle.${dn.getDay()}_${dn.getMonth()}_${dn.getFullYear()}.${dn.getHours()}_${dn.getMinutes()}_${dn.getSeconds()}.js`,
            clean: true,
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8].css",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(scss|css)$/,
                    use: [
                      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                      {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
                            },
                        },
                      },
                      "sass-loader",
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? {
            port: env.port ?? 3000,
            open: false,
            historyApiFallback: true,
        } : undefined
    }
    return config
};