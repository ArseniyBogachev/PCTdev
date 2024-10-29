
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./accets/styles/app.module.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";


const App = () => {
    return (
        <div className={classes.main}>
            <Loading state={false}/>
            <Outlet/>
        </div>
    )
}

export default App
