
import axios from "axios";


async function loginApi(email: string, password: string) {
    console.log('ENV -> ', process.env.REACT_APP_SERVER)
    try { 
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/auth/token/login/`, 
            {
                email: email, 
                password: password
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function logoutApi(token: string) {
    try { 
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/auth/token/logout/`, 
            {}, 
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function registerApi(
    email: string,
    phone: string,
    fio: string,
    organization: string,
    inn: string,
    password: string,
) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/auth/users/`, 
            {
                email: email, 
                password: password,
                phone: phone, 
                fio: fio,
                organization: organization, 
                inn: inn
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function meApi(
    token: string
) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/auth/users/me/`, 
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function updateMeApi(
    token: string,
    data: {
        phone: string,
        fio: string,
        organization: string,
        inn: string
    }
) {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER}/api/v1/auth/users/me/`, 
            data,
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function getUsersApi (
    token: string,
    page: number | undefined,
    filter: {organization?: string | null, email?: string | null, factory?: string | null}
) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/auth/user/list/`, 
            {
                params: {
                    page: page,
                    organization: filter.organization,
                    email: filter.email,
                    factory: filter.factory
                },
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function delUsersApi (
    token: string,
    data: number[]
) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/auth/user/del/`, 
            {
                headers: {
                    "Authorization": `Token ${token}`
                },
                data: {id: data}
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function sendEmailApi (
    email: string
) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/auth/users/reset_password/`, 
            {
                email: email
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function updatePasswordApi (
    data: {
        uid: string
        token: string
        new_password: string
    }
) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/auth/users/reset_password_confirm/`, data);

        return response;
    }
    catch (e) {
        return e
    }
};


async function getFilterOrgApi (
    token: string
) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/auth/user/filter/org/`, 
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


async function getFilterEmailApi (
    token: string
) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/auth/user/filter/email/`, 
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        );

        return response;
    }
    catch (e) {
        return e
    }
};


export {
    logoutApi,
    loginApi,
    registerApi,
    meApi,
    getUsersApi,
    delUsersApi,
    updateMeApi,
    sendEmailApi,
    updatePasswordApi,
    getFilterOrgApi,
    getFilterEmailApi
}