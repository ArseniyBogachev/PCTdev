export const devServerConf = ({env}: any) => {
    return {
        port: env.port ?? 3000,
        open: false,
        historyApiFallback: true,
    }
}