
export type GeneralNotification = {
    type: string,
    mainText: string,
    extraText: string,
    totalStyle: string,
    lvl: string,
    close: boolean
}

export type GeneralState = {
    listNotification: GeneralNotification[]
    currentNotification: boolean | GeneralNotification
    loading: boolean
}