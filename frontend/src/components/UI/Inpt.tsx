
import classes from "../../accets/styles/components/UI/inpt.module.scss";
import classNames from 'classnames';


const Inpt = ({
    type,
    name,
    after,
    mainStyle,
    wrapStyle,
    inptStyle,
    nameStyle,
    stateError,
    textError,
    value,
    area
}: any) => {
    return (
        <div className={classes.main} style={mainStyle}>
            {name ? <span className={nameStyle ? classes[`main__${nameStyle}`] : classes.main__name}>{name}</span> : <></>}
            <div className={classes.main__wrapper} style={wrapStyle}>
                {
                    area ?
                    <textarea className={classNames(classes.main__wrapper__inpt, stateError ? classes.error : "")}></textarea> :
                    <input type={type} className={classNames(classes.main__wrapper__inpt, stateError ? classes.error : "")} style={inptStyle} value={value} size={1}/>
                }
                <div className={classes.main__wrapper__after}>{after}</div>
            </div>
            <label className={classes.main__error}>{textError}</label>
        </div>
    )
}

export default Inpt