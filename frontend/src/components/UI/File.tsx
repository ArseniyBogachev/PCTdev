
import classes from "../../accets/styles/components/UI/file.module.scss";
import classNames from 'classnames';
import { PropsFile } from "../../services/typing/interfaces/components/UI/file.interfaces";
import upload from "../../accets/images/Upload.png";


const File:React.FC<PropsFile> = () => {
    return (
        <div className={classes.main}>
            <span className={classes.main__label}>Файл для импорта</span>
            <input type="file" className={classes.main__input}/>
            <div className={classes.main__content}>
                <div className={classes.main__content__icon}>
                    <img src={upload} alt="..."/>
                </div>
                <div className={classes.main__content__text}>
                    <div className={classes.main__content__text__main}>Загрузить файл</div>
                    <div className={classes.main__content__text__side}>XML. Максимум 50 МБ</div>
                </div>
            </div>
        </div>
    )
}

export default File