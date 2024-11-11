
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import classes from "./accets/styles/app.module.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";
import NotificationWrap from "./components/NotificationWrap";
import { useAppSelector, useAppDispatch } from "./services/hooks/redux";
import { userSlice } from "./services/store/reducers/user.dux";
import { checkUrl } from "./router/protectedRouter";
import { meApi } from "./services/api/auth.api";


const App = () => {

    const { currentNotification, loading } = useAppSelector(state => state.general);
    const navigate = useNavigate();
    const { write } = userSlice.actions;
    const dispatch = useAppDispatch();
    const [cookies, _, __] = useCookies<string>(["user"]);

    async function me () {
        const response = await meApi(cookies.token);

        if (response.status === 200) {
            dispatch(write(response.data));
            checkUrl(window.location.pathname, navigate, response.data);
        }
        else {
            checkUrl(window.location.pathname, navigate);
        }
    };

    useEffect(() => {
        const get = async () => {
            await me();
        };
        get();
    }, [])

    return (
        <div className={classes.main}>
            {currentNotification ? <NotificationWrap data={currentNotification}/> : <></>}
            <Loading state={loading}/>
            <Outlet/>
        </div>
    )
}

export default App
