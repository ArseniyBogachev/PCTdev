
import classes from "../../accets/styles/components/UI/search.module.scss";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { PropsSearch } from "../../services/typing/interfaces/components/UI/search.interfaces";
import Inpt from "./Inpt";


const Search:React.FC<PropsSearch> = ({active}) => {
    return (
        <div className={classes.main}>
            <FontAwesomeIcon 
                icon={faMagnifyingGlass}
                className={classes.main__icon}
            ></FontAwesomeIcon>
            {active ? <div className={classes.main__enter}><Inpt/></div> : <></>}
        </div>
    )
}

export default Search