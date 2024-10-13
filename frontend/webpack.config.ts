
import webpack from 'webpack'
import path from 'path';
import { buildConf } from './src/config/buildWP/main';
import { Env } from './src/config/buildWP/typing/interfaces';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


// type Mode = 'development' | 'production' | 'none'

// interface EnvVariables {
//     mode: Mode;
//     port: number | undefined;
// }

export default (env: Env) => {

    const isDev: boolean = env.mode === 'development'

    const config: webpack.Configuration = buildConf({
        env: env,
        isDev: isDev,
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            output: path.resolve(__dirname, 'build'),
            html: path.resolve(__dirname, 'public', 'index.html')
        }
    })
    
    return config
};