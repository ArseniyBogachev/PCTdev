
// import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth";
import { Navigate, RegisterData, RegisterParam } from "../typing/interfaces/hooks/auth.interfaces";


const register = async (
    data: RegisterData,
    param: RegisterParam
) => {

    // const navigate = useNavigate();
    const {email, phone, fio, organization, inn, password} = data;
    const {nav, extra } = param;

    const response = await registerApi(email, phone, fio, organization, inn, password);

    switch (response.status) {
        case 200:
            {
                return response;
                break;
            }
    }
    
}

export {
    register,
}