
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";


export const dataAccount = (is_superuser: boolean) => {
    const menu = [
        {
            id: 1,
            text: "Заказы",
            icon: faFileLines,
            link: "/order",
            onlyAdmin: false
        },
        {
            id: 2,
            text: "Продукт",
            icon: faBox,
            link: "/product",
            onlyAdmin: true
        },
        {
            id: 3,
            text: "Пользователи",
            icon: faUsers,
            link: "/user",
            onlyAdmin: true
        },
        {
            id: 4,
            text: is_superuser ? "Фабрики" : "Аккаунты (фабрики)",
            icon: faIndustry,
            link: "/factory",
            onlyAdmin: false
        },
    ];

    return {
        menu
    }
}