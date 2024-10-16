
import classes from "../accets/styles/components/menuBodyWrap.module.scss"
import classNames from 'classnames';


const MenuBodyWrap = ({
    title,
    body
}: any) => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__header}>
                        <h2 className={classes.content__header__title}>{title}</h2>
                    </div>
                    <div className={classes.content__body}>
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuBodyWrap