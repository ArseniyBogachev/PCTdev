
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


export const module = ({isDev}: any) => {
    return {
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
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    }
}