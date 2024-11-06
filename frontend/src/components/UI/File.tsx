
import { useState } from "react";
import classes from "../../accets/styles/components/UI/file.module.scss";
import classNames from 'classnames';
import { PropsFile } from "../../services/typing/interfaces/components/UI/file.interfaces";
import upload from "../../accets/images/Upload.png";
import file from "../../accets/images/file.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const File:React.FC<PropsFile> = ({accept, value, setValue, delValue}) => {
    return (
        <div className={classes.main}>
            <span className={classes.main__label}>Файл для загрузки</span>
            {!value.file ? <input type="file" accept={accept ?? 'text/xml'} className={classes.main__input} disabled={Boolean(value.file)} onChange={(e) => setValue(e)}/> : <></>}
            {
                value.file ? 
                <div className={classes.main__contentAdd}>
                    <div className={classes.main__contentAdd__image}>
                        <img src={file} alt="..." />
                    </div>
                    <div className={classes.main__contentAdd__info}>
                        <div className={classes.main__contentAdd__info__name}>{value.name}</div>
                        <div className={classes.main__contentAdd__info__size}>{value.size} Байт</div>
                        <FontAwesomeIcon 
                            icon={faXmark} 
                            className={classes.main__contentAdd__info__xmark} 
                            onClick={() => {
                                delValue();
                                console.log('del')
                            }}
                        />
                    </div>
                </div> :
                <div className={classes.main__contentEmpty}>
                    <div className={classes.main__contentEmpty__icon}>
                        <img src={upload} alt="..."/>
                    </div>
                    <div className={classes.main__contentEmpty__text}>
                        <div className={classes.main__contentEmpty__text__main}>Загрузить файл</div>
                        <div className={classes.main__contentEmpty__text__side}>XML. Максимум 50 МБ</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default File