
import webpack from 'webpack';
import { plugins } from './plagins';
import { module } from './module';
import { devServerConf } from './devServer';
import { Opt } from './typing/interfaces';
const dn = new Date();


export const buildConf = (opt: Opt): webpack.Configuration => {
    const {env, isDev, paths} = opt

    return {
        mode: env.mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: `bundle.${dn.getDay()}_${dn.getMonth()}_${dn.getFullYear()}.${dn.getHours()}_${dn.getMinutes()}_${dn.getSeconds()}.js`,
            clean: true,
            publicPath: '/',
        },
        plugins: plugins({paths: paths}),
        module: module({isDev: isDev}),
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? devServerConf({env: env}) : undefined
    }
}