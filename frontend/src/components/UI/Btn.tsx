
import classes from "../../accets/styles/components/UI/btn.module.scss";
import classNames from 'classnames';


const Btn = ({
    text,
    type,
    mainStyle,
    btnStyle,
    before,
    after,
    action
}: any) => {
    return (
        <div className={classes.main} style={mainStyle}>
            <button 
                className={classNames(classes.main__btn, classes.main__default)} 
                type={type}
                style={btnStyle}
                onClick={action}
            >
                {before}
                <span>{text}</span>
                {after}
            </button>
        </div>
    )
}

export default Btn