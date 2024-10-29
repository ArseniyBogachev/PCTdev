
import classes from "../../accets/styles/components/UI/slct.module.scss";
import classNames from 'classnames';
import { PropsSelect } from "../../services/typing/interfaces/components/UI/slct.interfaces";
import Form from 'react-bootstrap/Form';


const Slct:React.FC<PropsSelect> = ({data, currentItem, label, mainStyle}) => {
    return (
        <div className={classes.main} style={mainStyle}>
            {label ? <label className={classes.main__label}>{label}</label> : <></>}
            <Form.Select aria-label="Default select example" className={classes.main__select}>
                {
                    data.map(item => 
                        <option 
                            value={item.id} 
                            key={item.id} 
                            className={classes.main__select__opt}
                        >{item.text}</option>
                    )
                }
            </Form.Select>
        </div>
    )
}

export default Slct