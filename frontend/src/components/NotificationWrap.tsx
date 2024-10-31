
import classes from "../accets/styles/components/notificationWrap.module.scss";
import { PropsNotificationWrap } from "../services/typing/interfaces/components/notificationWrap.interfaces";
import Notification from "./UI/Notification";


const NotificationWrap:React.FC<PropsNotificationWrap> = ({data}) => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                {
                    data ? Notification(data) : <></>
                }
            </div>
        </div>
    )
}

export default NotificationWrap
