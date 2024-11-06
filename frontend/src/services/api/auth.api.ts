
import axios from "axios";


async function loginApi(email: string, password: string) {
    try { 
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/token/login/', 
            {
                email: email, 
                password: password
            }
        )
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
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/users/', 
            {
                email: email, 
                password: password,
                phone: phone, 
                fio: fio,
                organization: organization, 
                inn: inn
            }
        )

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
        const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/', 
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        )

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
        const response = await axios.get('http://127.0.0.1:8000/api/v1/auth/user/list/', 
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
        )

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
        const response = await axios.delete('http://127.0.0.1:8000/api/v1/auth/user/del/', 
            {
                headers: {
                    "Authorization": `Token ${token}`
                },
                data: {id: data}
            }
        )

        return response;
    }
    catch (e) {
        return e
    }
};


export {
    loginApi,
    registerApi,
    meApi,
    getUsersApi,
    delUsersApi
}