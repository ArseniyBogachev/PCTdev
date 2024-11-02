
import { useState } from "react";
import classes from "../../accets/styles/components/UI/search.module.scss";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { PropsSearch } from "../../services/typing/interfaces/components/UI/search.interfaces";
import Inpt from "./Inpt";


const Search:React.FC<PropsSearch> = ({}) => {

    const [show, setShow] = useState(false);

    return (
        <div className={classes.main}>
            <div className={classes.main__btn}>
                <FontAwesomeIcon 
                    icon={faMagnifyingGlass}
                    className={classNames(classes.main__btn__icon, show ? classes.main__btn__icon__active : '')}
                    onClick={() => setShow(!show)}
                ></FontAwesomeIcon>
            </div>
            {
                show ? 
                <div className={classes.main__enter}>
                    <Inpt 
                        type={'text'} 
                        inptStyle={{borderRadius: '0', padding: '0 5px', boxShadow: '0 0 3px 1px rgb(240, 240, 240)', opacity: '0.9'}}
                    />
                </div> : <></>}
        </div>
    )
}

export default Search