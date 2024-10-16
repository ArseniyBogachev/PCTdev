
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import classes from "../accets/styles/pages/account.module.scss"
import classNames from 'classnames';
import logo from "../accets/images/nl1.png";
import profile from "../accets/images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataAccount } from "../services/data/dataAccount";


const Account = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { menu } = dataAccount();

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <nav className={classes.navbar}>
                    <div className={classes.navbar__header}>
                        <div className={classes.navbar__header__wrapper}>
                            <img src={logo} alt="..." />
                        </div>
                    </div>
                    <div className={classes.navbar__menu}>
                        <div className={classes.navbar__menu__list}>
                            {menu.map(item => 
                                <div className={classNames(classes.navbar__menu__list__item, location.pathname === item.link ? classes.activeItem : "")} onClick={() => {navigate(item.link)}}>
                                    <FontAwesomeIcon icon={item.icon} className={classNames(classes.navbar__menu__list__item__icon, location.pathname === item.link ? classes.activeIcon : "")}/>
                                    <span className={classes.navbar__menu__list__item__text}>{item.text}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={classes.navbar__profile}>
                        <div className={classes.navbar__profile__wrapper}>
                            <div className={classes.navbar__profile__wrapper__icon}>
                                <img src={profile} alt="..." />
                            </div>
                            <div className={classes.navbar__profile__wrapper__info}>
                                <div className={classes.navbar__profile__wrapper__info__name}>rst-invent.ru</div>
                                <div className={classes.navbar__profile__wrapper__info__status}>Администратор</div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className={classes.content}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Account