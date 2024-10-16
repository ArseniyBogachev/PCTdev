
import classes from "../../accets/styles/pages/menu/order.module.scss";
import classNames from 'classnames';
import Btn from "../../components/UI/Btn";
import plus from "../../accets/images/Plus.png";
import trash from "../../accets/images/Trash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";


const Order = ({
    
}: any) => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__header}>
                        <div className={classes.content__header__btn}>
                            <Btn 
                                text={"Добавить заказ"} 
                                mainStyle={{width: "auto"}} 
                                btnStyle={{padding: "0 20px"}} 
                                after={<FontAwesomeIcon icon={faPlus} style={{marginLeft: "10px", transform: "translate(0, 10%)", fontSize: "15px"}}/>}
                            />
                            <Btn 
                                text={"Удалить"} 
                                mainStyle={{width: "auto", marginLeft: "10px"}} 
                                btnStyle={{padding: "0 20px"}} 
                                after={<FontAwesomeIcon icon={faTrashCan} style={{marginLeft: "10px", transform: "translate(0, 10%)", fontSize: "15px"}}/>}
                                btnCls={"main__inactive"}
                            />
                        </div>
                    </div>
                    <div className={classes.content__body}>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order