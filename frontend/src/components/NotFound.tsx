
import classes from "../accets/styles/components/notFound.module.scss";


const NotFound = () => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__number}>
                        <span>404</span>
                    </div>
                    <div className={classes.content__mainText}>
                        <span>Страница не найдена</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound