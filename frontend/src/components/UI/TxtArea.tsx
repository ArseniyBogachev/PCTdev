
import classes from "../../accets/styles/components/UI/txtArea.module.scss";
import classNames from 'classnames';
import { PropsTxtArea } from "../../services/typing/interfaces/components/UI/txtArea.interfaces";


const TxtArea:React.FC<PropsTxtArea> = () => {
    return (
        <div className={classes.main}>
            <textarea name="" id=""></textarea>
        </div>
    )
}

export default TxtArea