
import classes from "../../accets/styles/components/UI/notification.module.scss";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import access from "../../accets/images/access.png";
import info from "../../accets/images/info.png";


const Notification = ({
    mainStyle,
    mainText,
    extraText,
    mainClr,
    imgClr,
    lvl,
    type,
    close,
    totalStyle
}: any) => {

    const style: any = {
        icon: {
            access: access,
            info: info
        },
        color: {
            access: 'green',
            info: '#FFFBE6'
        }
    }

    return (
        <div className={type === 'fixed' ? classNames(classes.main__fxd, classes[mainClr], classes[lvl]) : classes.main__blk} style={{...mainStyle, backgroundColor: style.color[totalStyle]}}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classNames(classes.content__image, classes[imgClr])}>
                        <img src={style.icon[totalStyle]} alt="..." />
                    </div>
                    <div className={classes.content__text}>
                        <div className={classes.content__text__main}>{mainText}</div>
                        <div className={classes.content__text__extra}>{extraText}</div>
                    </div>
                    {close ? <FontAwesomeIcon icon={faXmark} className={classes.content__xmark}/> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Notification