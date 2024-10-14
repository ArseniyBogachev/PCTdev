
import classes from "../../accets/styles/components/UI/inpt.module.scss";
import classNames from 'classnames';


const Inpt = ({
    type,
    name,
    after,
    mainStyle,
    wrapStyle,
    inptStyle
}: any) => {
    return (
        <div className={classes.main} style={mainStyle}>
            <label className={classes.main__name}>{name}</label>
            <div className={classes.main__wrapper} style={wrapStyle}>
                <input type={type} className={classes.main__wrapper__inpt} style={inptStyle}/>
                <div className={classes.main__wrapper__after}>{after}</div>
            </div>
        </div>
    )
}

export default Inpt