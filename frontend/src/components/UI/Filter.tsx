
import classes from "../../accets/styles/components/UI/filter.module.scss";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { PropsFilter } from "../../services/typing/interfaces/components/UI/filter.interfaces";


const Filter:React.FC<PropsFilter> = ({text, click}) => {
    return (
        <div className={classes.main} onClick={() => click()}>
            <div className={classes.main__text}>{text}</div>
            <FontAwesomeIcon 
                icon={faSort} 
                className={classes.main__icon}
            ></FontAwesomeIcon>
        </div>
    )
}

export default Filter