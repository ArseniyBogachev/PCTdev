
import classes from "../../accets/styles/components/UI/download.module.scss";
import classNames from 'classnames';
import { PropsDownload } from "../../services/typing/interfaces/components/UI/download.interfaces";


const Download:React.FC<PropsDownload> = ({text}) => {
    return (
        <div className={classes.main}>
            <span className={classes.main__text}>{text}</span>
        </div>
    )
}

export default Download