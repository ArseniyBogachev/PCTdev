
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from "../pages/Account";
import MenuBodyWrap from "../components/MenuBodyWrap";
import Order from "../pages/menu/Order";
import Product from "../pages/menu/Product";
import User from "../pages/menu/User";
import Factory from "../pages/menu/Factory";


const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                element: <Account/>,
                children: [
                    {
                        path: "/order",
                        element: <MenuBodyWrap body={<Order/>} title={"Список заказов"}/>
                    },
                    {
                        path: "/product",
                        element: <MenuBodyWrap body={<Product/>} title={"Список продуктов"}/>
                    },
                    {
                        path: "/user",
                        element: <MenuBodyWrap body={<User/>} title={"Список пользователей"}/>
                    },
                    {
                        path: "/factory",
                        element: <MenuBodyWrap body={<Factory/>} title={"Список фабрик"}/>
                    },
                ]
            },
        ]
    }
    
]);

export default router