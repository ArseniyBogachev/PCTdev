
import classes from "../../accets/styles/components/UI/dropdownList.module.scss";
import { PropsDropdownList } from "../../services/typing/interfaces/components/UI/dropdownList.interfaces";
import classNames from 'classnames';
import { range } from "../../services/hooks/other";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


const DropdownList:React.FC<PropsDropdownList> = ({id, count, list, state, setState}) => {
    return (
        <div className={classes.main}>
            <div className={classes.main__drop}>
                <div className={classes.main__drop__item}>
                    {range(count).map(item => 
                        <span className={classes.main__drop__item__text} key={item}>{list[item]}</span>
                    )}
                </div>
                <div className={classes.main__drop__down}>
                    <FontAwesomeIcon icon={faChevronDown} className={classes.main__drop__down__icon} onClick={() => setState()}/>
                </div>
            </div>
            <div className={classNames(classes.main__list, state ? classes.open : "")}>
                {list.map(item => 
                    <div className={classes.main__list__item} key={item}>
                        <span className={classes.main__list__item__text}>{item}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropdownList