
import classes from "../../accets/styles/components/UI/btn.module.scss";


const Btn = ({
    text,
    type,
    mainStyle,
    btnStyle
}: any) => {
    return (
        <div className={classes.main} style={mainStyle}>
            <button 
                className={classes.main__btn} 
                type={type}
                style={btnStyle}
            >{text}</button>
        </div>
    )
}

export default Btn