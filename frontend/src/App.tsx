
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./accets/styles/app.module.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";
import NotificationWrap from "./components/NotificationWrap";
import { useAppSelector } from "./services/hooks/redux";


const App = () => {

    const {notification} = useAppSelector(state => state.reducer)
    // console.log(notification)

    return (
        <div className={classes.main}>
            <NotificationWrap data={notification}/>
            <Loading state={false}/>
            <Outlet/>
        </div>
    )
}

export default App
