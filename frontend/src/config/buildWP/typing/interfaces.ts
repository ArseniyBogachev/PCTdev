
import { Mode } from "./typesVar";


interface Env {
    mode: Mode;
    port: number | undefined;
}

interface Paths {
    entry: string,
    output: string,
    html: string
    dotenv: string
}

interface Opt {
    env: Env
    isDev: boolean
    paths: Paths
}

export {
    Env,
    Paths,
    Opt
}