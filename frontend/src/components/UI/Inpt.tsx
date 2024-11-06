
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
    nameCls,
    stateError,
    textError,
    value,
    setValue,
    area,
    placeholder,
    disabled,
    clickEnter
}: any) => {

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            clickEnter()
        }
    }

    return (
        <div className={classes.main} style={mainStyle}>
            {name ? <span className={nameCls ? classes[`main__${nameCls}`] : classes.main__name} style={nameStyle}>{name}</span> : <></>}
            <div className={classes.main__wrapper} style={wrapStyle}>
                {
                    area ?
                    <textarea className={classNames(classes.main__wrapper__inpt, stateError ? classes.error : "")}></textarea> :
                    <input 
                        type={type} 
                        className={classNames(classes.main__wrapper__inpt, stateError ? classes.error : "")} 
                        style={inptStyle} 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)}
                        size={1} 
                        placeholder={placeholder}
                        disabled={disabled}
                        onKeyDown={clickEnter ? handleKeyDown : () => {}}
                    />
                }
                <div className={classes.main__wrapper__after}>{after}</div>
            </div>
            <label className={classes.main__error}>{textError}</label>
        </div>
    )
}

export default Inpt