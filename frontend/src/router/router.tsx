
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from "../pages/Account";
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
                        element: <Order/>
                    },
                    {
                        path: "/product",
                        element: <Product/>
                    },
                    {
                        path: "/user",
                        element: <User/>
                    },
                    {
                        path: "/factory",
                        element: <Factory/>
                    },
                ]
            },
        ]
    }
    
]);

export default router