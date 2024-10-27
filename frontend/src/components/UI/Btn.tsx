
import classes from "../../accets/styles/components/UI/btn.module.scss";
import classNames from 'classnames';


const Btn = ({
    text,
    type,
    mainStyle,
    btnStyle,
    textStyle,
    before,
    after,
    action,
    btnCls
}: any) => {
    return (
        <div className={classes.main} style={mainStyle}>
            <button 
                className={classNames(classes.main__btn, classes[`main__${btnCls ?? 'default'}`])} 
                type={type}
                style={btnStyle}
                onClick={action}
            >
                {before}
                <span style={textStyle}>{text}</span>
                {after}
            </button>
        </div>
    )
}

export default Btn