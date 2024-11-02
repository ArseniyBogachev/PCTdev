
import axios from "axios";


async function addFactoryApi(
    token: string,
    data: {
        name: string,
        phone: string,
        email: string,
        fio: string,
        registration_number: string,
    }
) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/app/factory/', 
            {
                name: data.name, 
                phone: data.phone,
                email: data.email, 
                fio: data.fio,
                registration_number: data.registration_number
            },
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        )

        return response
    }
    catch (e) {
        return e
    }
};


async function getFactoryApi(
    token: string
) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/factory/', 
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        )

        return response
    }
    catch (e) {
        return e
    }
};


export {
    addFactoryApi,
    getFactoryApi
}