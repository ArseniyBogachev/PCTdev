
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./accets/styles/app.module.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


const App = () => {
    return (
        <div className={classes.main}>
            <Outlet/>
        </div>
    )
}

export default App
