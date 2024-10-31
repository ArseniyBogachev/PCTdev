
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./accets/styles/app.module.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";
import NotificationWrap from "./components/NotificationWrap";
import { useAppSelector } from "./services/hooks/redux";


const App = () => {

    const { currentNotification, loading } = useAppSelector(state => state.reducer)

    return (
        <div className={classes.main}>
            <NotificationWrap data={currentNotification}/>
            <Loading state={loading}/>
            <Outlet/>
        </div>
    )
}

export default App
