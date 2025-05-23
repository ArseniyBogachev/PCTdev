
import webpack from 'webpack';
import path from 'path';
import { buildConf } from './src/config/buildWP/main';
import { Env } from './src/config/buildWP/typing/interfaces';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


export default (env: Env) => {

    const isDev: boolean = env.mode === 'development'

    const config: webpack.Configuration = buildConf({
        env: env,
        isDev: isDev,
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            output: path.resolve(__dirname, 'build'),
            html: path.resolve(__dirname, 'public', 'index.html'),
            dotenv: path.resolve(__dirname, `.env.${env.mode}`)
        }
    })
    
    return config
};