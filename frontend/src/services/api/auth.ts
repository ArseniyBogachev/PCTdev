
import axios from "axios";


async function loginApi(email: string, password: string) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login/', 
            {
                email: email, 
                password: password
            }
        )
        return response
    }
    catch (e) {
        return e
    }
}

async function registerApi(
    email: string,
    phone: string,
    fio: string,
    organization: string,
    inn: string,
    password: string,
) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/register/', 
            {
                email: email, 
                password: password,
                phone: phone, 
                fio: fio,
                organization: organization, 
                inn: inn
            }
        )

        return response
    }
    catch (e) {
        return e
    }
}

export {
    loginApi,
    registerApi
}