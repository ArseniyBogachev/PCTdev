
import classes from "../accets/styles/components/headerBtn.module.scss";
import classNames from 'classnames';
import Btn from "./UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PropsHeaderBtn } from "../services/typing/interfaces/components/headerBtn.interfaces";


const HeaderBtn:React.FC<PropsHeaderBtn> = ({one, two}) => {

    const {valueOne, actionOne, textOne, afterOne, clsStyleOne} = one
    const {valueTwo, actionTwo, textTwo, afterTwo, clsStyleTwo} = two

    return (
        <div className={classes.main}>
            <Btn 
                text={textOne} 
                mainStyle={{width: "auto"}} 
                btnStyle={{padding: "0 20px"}}
                btnCls={clsStyleOne ?? 'default'}
                after={afterOne ?? <FontAwesomeIcon icon={faPlus} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>}
                action={actionOne}
            />
            <Btn 
                text={textTwo} 
                mainStyle={{width: "auto", marginLeft: "10px"}} 
                btnStyle={{padding: "0 20px"}} 
                after={afterTwo ?? <FontAwesomeIcon icon={faTrashCan} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>}
                btnCls={clsStyleTwo ?? 'inactive'}
                action={actionTwo}
            />
        </div>
    )
}

export default HeaderBtn