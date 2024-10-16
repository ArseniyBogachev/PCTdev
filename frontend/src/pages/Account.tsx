
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import classes from "../accets/styles/pages/account.module.scss"
import classNames from 'classnames';
import logo from "../accets/images/nl1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";


const Account = () => {

    const navigate = useNavigate()


    // ВЫНЕСТИ В ОТДЕЛЬНЫЙ ФАЙЛ //
    const [menu, setMenu] = useState([
        {
            id: 1,
            text: "Заказы",
            icon: faFileLines,
            state: true,
            link: "/order",
        },
        {
            id: 2,
            text: "Продукт",
            icon: faBox,
            state: false,
            link: "/product",
        },
        {
            id: 3,
            text: "Пользователи",
            icon: faUsers,
            state: false,
            link: "/user",
        },
        {
            id: 4,
            text: "Фабрики",
            icon: faIndustry,
            state: false,
            link: "/factory",
        },
    ]);

    const selectItemMenu = (id: number) => {
        const newMenu = menu.map(item => {
            item.id === id ? (
                item.state = true,
                navigate(item.link)
            ) : item.state = false
            return item
        });
        setMenu(newMenu);
    };

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <nav className={classes.navbar}>
                    <div className={classes.navbar__header}>
                        <img src={logo} alt="..." />
                    </div>
                    <div className={classes.navbar__menu}>
                        <div className={classes.navbar__menu__list}>
                            {menu.map(item => 
                                <div className={classNames(classes.navbar__menu__list__item, item.state ? classes.activeItem : "")} onClick={() => selectItemMenu(item.id)}>
                                    <FontAwesomeIcon icon={item.icon} className={classNames(classes.navbar__menu__list__item__icon, item.state ? classes.activeIcon : "")}/>
                                    <span className={classes.navbar__menu__list__item__text}>{item.text}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={classes.navbar__profile}>
                        <div className={classes.navbar__profile__icon}>

                        </div>
                        <div className={classes.navbar__profile__info}>
                            <div className={classes.navbar__profile__info__name}>rst-invent.ru</div>
                            <div className={classes.navbar__profile__info__status}>Администратор</div>
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