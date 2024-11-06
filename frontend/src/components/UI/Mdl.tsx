
import React from "react";
import classes from "../../accets/styles/components/UI/mdl.module.scss";
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import { PropsMdl } from "../../services/typing/interfaces/components/UI/mdl.interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Btn from "./Btn";


const Mdl:React.FC<PropsMdl> = ({show, setShow, sizeModal, title, Body, btnLeft, btnRight, bodyH, bodyW}) => {
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            contentClassName={classes.main}
            dialogClassName={classes[`dialog__${bodyW}`]}
            centered
            backdrop={'static'}
        >
            <Modal.Header className={classes.main__header}>
                <Modal.Title id="example-modal-sizes-title-sm" className={classes.main__header__title}>
                    {title}
                </Modal.Title>
                <div className={classes.main__header__close} onClick={() => setShow(false)}>
                    <FontAwesomeIcon icon={faXmark} className={classes.main__header__close__icon}></FontAwesomeIcon>
                </div>
            </Modal.Header>
            <Modal.Body className={classes.main__body} style={{height: bodyH}}>
                <Body/>
            </Modal.Body>
            <Modal.Footer className={classes.main__footer}>
                <div className={classes.main__footer__wrap}>
                    <Btn 
                        type={'button'} 
                        text={btnLeft.text} 
                        btnCls={'gray'}
                        mainStyle={{width: "auto", marginRight: '10px'}} 
                        btnStyle={{padding: "0 20px"}}
                        after={btnLeft.after}
                        action={btnLeft.action}
                    />
                    <Btn 
                        type={'button'} 
                        text={btnRight.text}
                        mainStyle={{width: "auto"}} 
                        btnStyle={{padding: "0 20px"}}
                        after={btnRight.after}
                        action={btnRight.action}
                    />
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default Mdl