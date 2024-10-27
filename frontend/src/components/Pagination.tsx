
import classes from "../accets/styles/components/pagination.module.scss";
import classNames from 'classnames';
import { PropsPagination } from "../services/typing/interfaces/components/pagination.interfaces";
import Btn from "./UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { range } from "../services/hooks/other";


// btnStyle={{borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}

const Pagination:React.FC<PropsPagination> = ({count, currentPage}) => {
    return (
        <div className={classes.main}>
            <Btn 
                before={<FontAwesomeIcon icon={faChevronLeft} style={{fontSize: '1.2vh'}}/>} 
                mainStyle={{width: '4vh', height: '4vh', marginRight: '0.8vw'}} 
                btnStyle={{borderRadius: '5px'}} 
                btnCls={'gray'}
            />
            {
                range(1, count + 1).map(item =>
                    <Btn
                        text={item} 
                        mainStyle={{width: '4vh', height: '4vh', marginRight: '0.8vw'}} 
                        btnStyle={{borderRadius: '5px'}}
                        btnCls={currentPage === item ? 'default' : 'gray'}
                        textStyle={{fontSize: '1.5vh'}}
                    />
                )
            }       
            <Btn 
                after={<FontAwesomeIcon icon={faChevronRight} style={{fontSize: '1.2vh'}}/>} 
                mainStyle={{width: '4vh', height: '4vh',}} 
                btnStyle={{borderRadius: '5px'}} 
                btnCls={'gray'}
            />
        </div>
    )
}

export default Pagination