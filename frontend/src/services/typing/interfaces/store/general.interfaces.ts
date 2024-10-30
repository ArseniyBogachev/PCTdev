
export type GeneralNotification = (
    type: string,
    mainText: string,
    extraText: string,
    totalStyle: string,
    lvl: string,
    close: boolean
) => void

export type GeneralState = {
    notification: Notification[]
}