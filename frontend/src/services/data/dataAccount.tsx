
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";


export const dataAccount = () => {
    const menu = [
        {
            id: 1,
            text: "Заказы",
            icon: faFileLines,
            link: "/order"
        },
        {
            id: 2,
            text: "Продукт",
            icon: faBox,
            link: "/product",
        },
        {
            id: 3,
            text: "Пользователи",
            icon: faUsers,
            link: "/user",
        },
        {
            id: 4,
            text: "Фабрики",
            icon: faIndustry,
            link: "/factory",
        },
    ];

    return {
        menu
    }
}