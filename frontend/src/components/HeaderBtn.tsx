
import classes from "../accets/styles/components/headerBtn.module.scss";
import classNames from 'classnames';
import Btn from "./UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PropsHeaderBtn } from "../services/typing/interfaces/components/headerBtn.interfaces";


const HeaderBtn:React.FC<PropsHeaderBtn> = ({data}) => {

    // const {valueOne, actionOne, textOne, afterOne, clsStyleOne, delOne} = one
    // const {valueTwo, actionTwo, textTwo, afterTwo, clsStyleTwo, delTwo} = two

    return (
        <div className={classes.main}>
            {data.map((item, i) => Btn({
                text: item.text, 
                type: 'button', 
                mainStyle: {width: "auto", marginLeft: i > 0 ? "10px" : "0"}, 
                btnStyle: {padding: "0 20px"},
                btnCls: item.clsStyle ?? 'default',
                after: item.after,
                action: item.action
            }))}
            {/* {delOne ? <></> : <Btn 
                text={textOne} 
                mainStyle={{width: "auto"}} 
                btnStyle={{padding: "0 20px"}}
                btnCls={clsStyleOne ?? 'default'}
                after={afterOne ?? <FontAwesomeIcon icon={faPlus} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>}
                action={actionOne}
            />}
            {delTwo ? <></> : <Btn 
                text={textTwo} 
                mainStyle={{width: "auto", marginLeft: "10px"}} 
                btnStyle={{padding: "0 20px"}} 
                after={afterTwo ?? <FontAwesomeIcon icon={faTrashCan} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>}
                btnCls={clsStyleTwo ?? 'inactive'}
                action={actionTwo}
            />} */}
        </div>
    )
}

export default HeaderBtn