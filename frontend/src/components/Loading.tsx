
import classes from "../accets/styles/components/loading.module.scss";
import classNames from 'classnames';
import { PropsLoading } from "../services/typing/interfaces/components/loading.interfaces";
import loading from "../accets/images/loading.png";


const Loading:React.FC<PropsLoading> = ({state}) => {
    return (
        <div>
            {state ? <div className={classes.main}>
                <div className={classes.wrapper}>
                    <div className={classes.content}>
                        <div className={classes.content__icon}>
                            <img src={loading} alt="..." />
                        </div>
                        <div className={classes.content__info}>
                            <span className={classes.conetent__text}>Подождите, идет загрузка</span>
                        </div>
                    </div>
                </div>
            </div> : <></>}
        </div>
    )
}

export default Loading