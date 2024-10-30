
type AddNotificationT = (
    type: string,
    mainText: string,
    extraText: string,
    totalStyle: string,
    close: boolean
) => void

export {
    AddNotificationT
}