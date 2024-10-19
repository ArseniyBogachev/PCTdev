
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./accets/styles/app.module.scss"
import Button from "react-bootstrap/Button";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


const App = () => {
    return (
        <div className={classes.main}>
            <Button variant="primary">Primary</Button>
            <Outlet/>
        </div>
    )
}

export default App
