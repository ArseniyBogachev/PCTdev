
import { useState } from "react";
import classes from "../../accets/styles/components/UI/dropdownList.module.scss";
import { PropsDropdownList } from "../../services/typing/interfaces/components/UI/dropdownList.interfaces";
import classNames from 'classnames';
import { range } from "../../services/hooks/other";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


const DropdownList:React.FC<PropsDropdownList> = ({count, list}) => {

    const [state, setState] = useState(false)

    return (
        <div className={classes.main}>
            <div className={classes.main__drop}>
                <div className={classes.main__drop__item}>
                    {range(count).map(item => 
                        <span className={classes.main__drop__item__text}>{list[item]},</span>
                    )}
                </div>
                <div className={classes.main__drop__down}>
                    <FontAwesomeIcon icon={faChevronDown} className={classes.main__drop__down__icon} onClick={() => setState(!state)}/>
                </div>
            </div>
            <div className={classNames(classes.main__list, state ? classes.open : "")}>
                {list.map(item => 
                    <div className={classes.main__list__item}>
                        <span className={classes.main__list__item__text}>{item}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropdownList