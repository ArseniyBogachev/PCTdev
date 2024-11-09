
import { Provider } from "react-redux";
import { setupStore } from "../services/store/store";
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
import Profile from "../pages/menu/Profile";
import Reset from "../pages/Reset";
import NewPass from "../pages/NewPass";


const store = setupStore()

const router = createBrowserRouter([
    {
        element: <Provider store={store}><App/></Provider>,
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
                path: "/reset",
                element: <Reset/>,
            },
            {
                path: "/new/password/:uid/:token/",
                element: <NewPass/>
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
                    {
                        path: "/profile",
                        element: <MenuBodyWrap body={<Profile/>} title={"Список фабрик"}/>
                    },
                ]
            },
        ]
    }
    
]);

export default router