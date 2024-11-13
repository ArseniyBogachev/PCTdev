
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
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/app/factory/`, 
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
    page: number | undefined = 1,
    filter: {id?: string | null, name?: string | null, phone?: string | null, ordering?: string | null},
) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/app/factory/`, 
            {
                params: {
                    page: page,
                    id: filter.id,
                    name: filter.name,
                    phone: filter.phone,
                    ordering: filter.ordering
                },
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
        const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/app/factory/del/`, 
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


async function getFactoryFilterApi(
    token: string
) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/app/factory/filter/`, 
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
    getFactoryApi,
    delFactoryApi,
    getFactoryFilterApi
}