
import classes from "../accets/styles/components/pagination.module.scss";
import classNames from 'classnames';
import { PropsPagination } from "../services/typing/interfaces/components/pagination.interfaces";
import Btn from "./UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { hide } from "@popperjs/core";


const Pagination:React.FC<PropsPagination> = ({count}) => {
    return (
        <div className={classes.main}>
            <Btn 
                before={<FontAwesomeIcon icon={faChevronLeft} style={{fontSize: '1.2vh'}}/>} 
                mainStyle={{width: '3vh', height: '3vh', marginRight: '0.8vw'}} 
                btnStyle={{borderRadius: '5px'}} 
                btnCls={'main__gray'}
            />
            <Btn 
                after={<FontAwesomeIcon icon={faChevronRight} style={{fontSize: '1.2vh'}}/>} 
                mainStyle={{width: '3vh', height: '3vh',}} 
                btnStyle={{borderRadius: '5px'}} 
                btnCls={'main__gray'}
            />
        </div>
    )
}

export default Pagination