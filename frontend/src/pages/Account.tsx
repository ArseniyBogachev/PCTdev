
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import classes from "../accets/styles/pages/account.module.scss"
import classNames from 'classnames';
import logo from "../accets/images/nl1.png";
import profile from "../accets/images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataAccount } from "../services/static_data/dataAccount";
import { meApi } from "../services/api/auth.api";
import { useAppSelector, useAppDispatch } from "../services/hooks/redux";
import { userSlice } from "../services/store/reducers/user.dux";
import { generalSlice } from "../services/store/reducers/general.dux";
import NotFound from "../components/NotFound";


const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, _, __] = useCookies<string>(["user"]);

    const { user } = useAppSelector(state => state.user);
    const [menu, setMenu] = useState([]);
    const { write } = userSlice.actions;
    const { setLoading } = generalSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function me () {
            const response = await meApi(cookies.token);

            if (response.status === 200) {
                dispatch(write(response.data[0]));
                setMenu(dataAccount(response.data[0].is_superuser).menu);
            }
            else {
                console.log(response);
            }
        };

        setLoading(true);
        me();
        setLoading(false);
    }, [])

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
                                {menu.map((item, i) => 
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