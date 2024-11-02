
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouting = (route: any) => {
    const [cookies, _, __] = useCookies<string>(["user"]);
    return cookies.token ? route : {};
};

export default ProtectedRouting;