
type PropsFile = {
    accept?: string
    value: {
        file: string,
        name: string,
        size: number
    }
    setValue: Function
    delValue: Function
}

export {
    PropsFile,
}