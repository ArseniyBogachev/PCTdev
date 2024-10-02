
import * as webpack from 'webpack'
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
const dn = new Date();

export default (env: any) => {
    const config: webpack.Configuration = {
        mode: env.mode,
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: `bundle.${dn.getDay()}_${dn.getMonth()}_${dn.getFullYear()}.${dn.getHours()}_${dn.getMinutes()}_${dn.getSeconds()}.js`,
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')})
        ],
        module: {
            rules: [
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
    }
    return config
};