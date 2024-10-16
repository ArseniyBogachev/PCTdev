
import classes from "../../accets/styles/components/UI/notification.module.scss";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import access from "../../accets/images/access.png";


const Notification = ({
    mainStyle,
    mainText,
    extraText,
    mainClr,
    imgClr,
    lvl,
}: any) => {
    return (
        <div className={classNames(classes.main, classes[mainClr], classes[lvl])} style={mainStyle}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classNames(classes.content__image, classes[imgClr])}>
                        <img src={access} alt="..." />
                    </div>
                    <div className={classes.content__text}>
                        <div className={classes.content__text__main}>{mainText}</div>
                        <div className={classes.content__text__extra}>{extraText}</div>
                    </div>
                    <FontAwesomeIcon icon={faXmark} className={classes.content__xmark}/>
                </div>
            </div>
        </div>
    )
}

export default Notification