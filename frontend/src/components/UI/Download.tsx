
import classes from "../../accets/styles/components/UI/download.module.scss";
import classNames from 'classnames';
import { PropsDownload } from "../../services/typing/interfaces/components/UI/download.interfaces";
import { createFileForDownload } from "../../services/hooks/other";


const Download:React.FC<PropsDownload> = ({id, text, data, name, type}) => {
    return (
        <div className={classes.main}>
            <span className={classes.main__text} onClick={() => createFileForDownload(data, name, type)}>{text}</span>
        </div>
    )
}

export default Download