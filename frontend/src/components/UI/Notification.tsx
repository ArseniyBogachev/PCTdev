
import classes from "../../accets/styles/components/UI/notification.module.scss";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { styleNotificaiton } from "../../services/static_data/dataNotification";
import { useAppDispatch } from "../../services/hooks/redux";
import { generalSlice } from "../../services/store/reducers/general.dux";


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
    
    const {setCurrentNotification} = generalSlice.actions
    const dispatch = useAppDispatch()

    return (
        <div 
            className={type === 'fixed' ? classNames(classes.main__fxd, classes[mainClr], classes[`${lvl}anim`]) : classes.main__blk} 
            style={{...mainStyle, backgroundColor: styleNotificaiton.color[totalStyle]}}>

            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classNames(classes.content__image, classes[imgClr])}>
                        <img src={styleNotificaiton.icon[totalStyle]} alt="..." />
                    </div>
                    <div className={classes.content__text}>
                        <div className={classes.content__text__main}>{mainText}</div>
                        <div className={classes.content__text__extra}>{extraText}</div>
                    </div>
                    {
                        close ? 
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            className={classes.content__xmark} 
                            onClick={() => dispatch(setCurrentNotification(false))}
                        /> : 
                        <></>
                    }
                </div>
            </div>

        </div>
    )
}

export default Notification