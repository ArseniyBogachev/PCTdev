
import { useState } from "react";
import classes from "../../accets/styles/components/UI/slct.module.scss";
import classNames from 'classnames';
import { PropsSelect } from "../../services/typing/interfaces/components/UI/slct.interfaces";
import Form from 'react-bootstrap/Form';


const Slct:React.FC<PropsSelect> = ({data, state, setState, label, mainStyle, defaultOpt}) => {
    return (
        <div className={classes.main} style={mainStyle}>
            {label ? <label className={classes.main__label}>{label}</label> : <></>}
            <Form.Select aria-label="Default select example" className={classes.main__select} value={state} onChange={(e) => setState(Number(e.target.value))}>
                {defaultOpt ? <option selected={defaultOpt.selected} disabled={defaultOpt.disabled} value={defaultOpt.value}>{defaultOpt.text}</option> : <></>}
                {
                    data.map(item => 
                        <option 
                            value={item.id} 
                            key={item.id} 
                            className={classes.main__select__opt}
                        >{item.name}</option>
                    )
                }
            </Form.Select>
        </div>
    )
}

export default Slct