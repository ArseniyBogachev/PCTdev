
import product from "../../accets/images/productmenu.svg";
import order from "../../accets/images/ordermenu.svg";
import user from "../../accets/images/usermenu.svg";
import factory from "../../accets/images/factorymenu.svg";


export const dataAccount = (is_superuser: boolean) => {
    const menu = [
        {
            id: 1,
            text: "Заказы",
            icon: order,
            link: "/order",
            onlyAdmin: false
        },
        {
            id: 2,
            text: "Продукт",
            icon: product,
            link: "/product",
            onlyAdmin: true
        },
        {
            id: 3,
            text: "Пользователи",
            icon: user,
            link: "/user",
            onlyAdmin: true
        },
        {
            id: 4,
            text: is_superuser ? "Фабрики" : "Аккаунты (фабрики)",
            icon: factory,
            link: "/factory",
            onlyAdmin: false
        },
    ];

    return {
        menu
    }
}