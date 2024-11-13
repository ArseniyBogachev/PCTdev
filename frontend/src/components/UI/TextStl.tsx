
import classes from "../../accets/styles/components/UI/textStl.module.scss";
import classNames from 'classnames';


const TextStl = ({
    id,
    text,
    style,
    cls
}: any) => {
    return (
        <div className={classNames(classes.main, classes[cls])} style={style}>
            {text}
        </div>
    )
}

export default TextStl
