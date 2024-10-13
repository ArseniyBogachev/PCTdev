
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./accets/styles/app.module.scss"


const App = () => {
    return (
        <div className={classes.main}>
            <Outlet/>
        </div>
    )
}

export default App
