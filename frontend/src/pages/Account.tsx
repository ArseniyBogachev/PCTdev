
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import classes from "../accets/styles/pages/account.module.scss"
import classNames from 'classnames';
import logo from "../accets/images/nl1.png";
import profile from "../accets/images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataAccount } from "../services/static_data/dataAccount";
import { useAppSelector } from "../services/hooks/redux";


const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useAppSelector(state => state.user);

    return (
        <div className={classes.main}>

            {user ?
                <div className={classes.wrapper}>
                    <nav className={classes.navbar}>
                        <div className={classes.navbar__header}>
                            <div className={classes.navbar__header__wrapper}>
                                <img src={logo} alt="..." />
                            </div>
                        </div>
                        <div className={classes.navbar__menu}>
                            <div className={classes.navbar__menu__list}>
                                {dataAccount(user.is_superuser).menu.map((item, i) => 
                                    user.is_superuser || !item.onlyAdmin ? <div className={classNames(classes.navbar__menu__list__item, location.pathname === item.link ? classes.activeItem : "")} onClick={() => {navigate(item.link)}} key={i}>
                                        <FontAwesomeIcon icon={item.icon} className={classNames(classes.navbar__menu__list__item__icon, location.pathname === item.link ? classes.activeIcon : "")}/>
                                        <span className={classes.navbar__menu__list__item__text}>{item.text}</span>
                                    </div> : <></>
                                )}
                            </div>
                        </div>
                        <div className={classes.navbar__profile}>
                            <div className={classes.navbar__profile__wrapper}>
                                <div className={classes.navbar__profile__wrapper__icon}>
                                    <img src={profile} alt="..." onClick={() => navigate('/profile')}/>
                                </div>
                                <div className={classes.navbar__profile__wrapper__info}>
                                    <div className={classes.navbar__profile__wrapper__info__name}>{user.email}</div>
                                    <div className={classes.navbar__profile__wrapper__info__status}>{user.is_superuser ? 'Администратор' : 'Пользователь'}</div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className={classes.content}>
                        <Outlet/>
                    </div>
                </div>
            : <></>}
            
        </div>
    )
}

export default Account