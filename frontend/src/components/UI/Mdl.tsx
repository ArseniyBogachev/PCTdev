
import classes from "../../accets/styles/components/UI/mdl.module.scss";
import classNames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import { PropsMdl } from "../../services/typing/interfaces/components/UI/mdl.interfaces";


const Mdl:React.FC<PropsMdl> = ({show, setShow, sizeModal}) => {
    return (
        <Modal
            size={sizeModal}
            show={show}
            onHide={() => setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>...</Modal.Body>
        </Modal>
    )
}

export default Mdl