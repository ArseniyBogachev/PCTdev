
import axios from "axios";


async function addFactoryApi(
    token: string,
    data: {
        name: string,
        phone: string,
        email: string,
        fio: string,
        registration_number: string,
        owner: number
    }
) {
    try {
        console.log('data.owner', data.owner)
        const response = await axios.post('http://127.0.0.1:8000/api/v1/app/factory/', 
            {
                name: data.name, 
                phone: data.phone,
                email: data.email, 
                fio: data.fio,
                registration_number: data.registration_number,
                owner: data.owner
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
    token: string,
    page: number | undefined = 1
) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/factory/?page=${page}`, 
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


async function delFactoryApi(
    token: string,
    data: number[]
) {
    try {
        const response = await axios.delete('http://127.0.0.1:8000/api/v1/app/factory/del/', 
            {
                headers: {
                    "Authorization": `Token ${token}`
                },
                data: {id: data}
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
    getFactoryApi,
    delFactoryApi
}