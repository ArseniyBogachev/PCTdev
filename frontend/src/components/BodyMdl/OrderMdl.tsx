
import React from "react";
import classes from "../../accets/styles/components/BodyMdl/orderMdl.module.scss";
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import { PropsOrderMdl } from "../../services/typing/interfaces/components/BodyMdl/orderMdl.interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import File from "../UI/File";
import Slct from "../UI/Slct";


const OrderMdl:React.FC<PropsOrderMdl> = () => {
    return (
        <div className={classes.main}>
            <div className={classes.main__file}>
                <File/>
            </div>
            <div className={classes.main__body}>
                <Slct 
                    data={[
                        {id: 1, text: 'one'},
                        {id: 2, text: 'two'}
                    ]}
                    currentItem={1}
                />
            </div>
        </div>
    )
}

export default OrderMdl