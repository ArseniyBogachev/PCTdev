
import { useState } from "react";
import classes from "../../accets/styles/components/UI/editDataInpt.module.scss";
import classNames from 'classnames';
import { PropsEditDataInpt } from "../../services/typing/interfaces/components/UI/editDataInpt.interfaces";
import Inpt from "./Inpt";


const EditDataInpt:React.FC<PropsEditDataInpt> = ({
    type, 
    text,
    value
}) => {

    const [state, setState] = useState(false);

    return (
        <div className={classes.main}>
            <span className={classNames(classes.main__text, state ? classes.main__text__inactive : '')} onClick={() => setState(true)}>{text}</span>
            {
                state ? 
                <Inpt 
                    type={type} 
                    value={value} 
                    mainStyle={{position: 'absolute', top: '0', left: '0'}}
                    inptStyle={{borderRadius: '0'}}
                /> : <></>
            }
        </div>
    )
}

export default EditDataInpt