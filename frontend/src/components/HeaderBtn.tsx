
import classes from "../accets/styles/components/headerBtn.module.scss";
import classNames from 'classnames';
import Btn from "./UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PropsHeaderBtn } from "../services/typing/interfaces/components/headerBtn.interfaces";


const HeaderBtn:React.FC<PropsHeaderBtn> = ({add, del}) => {

    const {valueAdd, actionAdd} = add
    // const {valueDel, actionDel} = del

    return (
        <div className={classes.main}>
            <Btn 
                text={"Добавить заказ"} 
                mainStyle={{width: "auto"}} 
                btnStyle={{padding: "0 20px"}} 
                after={<FontAwesomeIcon icon={faPlus} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>}
                action={actionAdd}
            />
            <Btn 
                text={"Удалить"} 
                mainStyle={{width: "auto", marginLeft: "10px"}} 
                btnStyle={{padding: "0 20px"}} 
                after={<FontAwesomeIcon icon={faTrashCan} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>}
                btnCls={"inactive"}
                // action={actionDel}
            />
        </div>
    )
}

export default HeaderBtn