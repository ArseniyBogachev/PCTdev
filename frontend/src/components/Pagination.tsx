
import { useState } from "react";
import classes from "../accets/styles/components/pagination.module.scss";
import classNames from 'classnames';
import { PropsPagination } from "../services/typing/interfaces/components/pagination.interfaces";
import Btn from "./UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { range } from "../services/hooks/other";


const Pagination:React.FC<PropsPagination> = ({count, currentPage, api}) => {

    const [currentGroup, setCurrentGroup] = useState<number>(1);

    const maxGroup = Math.ceil(count / 3);

    return (
        <div className={classes.main}>
            <Btn 
                before={<FontAwesomeIcon icon={faChevronLeft} style={{fontSize: '1.2vh'}}/>} 
                mainStyle={{width: '4vh', height: '4vh', marginRight: '0.8vw'}} 
                btnStyle={{borderRadius: '5px'}} 
                btnCls={currentGroup > 1 ? 'gray' : 'inactive'}
                action={() => setCurrentGroup(currentGroup > 1 ? currentGroup - 1 : currentGroup)}
            />
            {
                range(currentGroup * 3 - 2, currentGroup * 3 + 1).map(item =>
                    <Btn
                        text={item} 
                        mainStyle={{width: '4vh', height: '4vh', marginRight: '0.8vw'}} 
                        btnStyle={{borderRadius: '5px'}}
                        btnCls={currentPage === item ? 'default' : item > count ? 'inactive' : 'gray'}
                        textStyle={{fontSize: '1.5vh'}}
                        action={() => {if (item <= count) {api(item)}}}
                    />
                )
            }       
            <Btn 
                after={<FontAwesomeIcon icon={faChevronRight} style={{fontSize: '1.2vh'}}/>} 
                mainStyle={{width: '4vh', height: '4vh',}} 
                btnStyle={{borderRadius: '5px'}} 
                btnCls={currentGroup < Math.ceil(count/3) ? 'gray' : 'inactive'}
                action={() => setCurrentGroup(currentGroup < maxGroup ? currentGroup + 1 : currentGroup)}
            />
        </div>
    )
}

export default Pagination