
import axios from "axios";


async function getProductApi(
    token: string,
    page: number | undefined = 1
) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/product/?page=${page}`, 
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


async function delProductApi(
    token: string,
    data: number[]
) {
    try {
        const response = await axios.delete('http://127.0.0.1:8000/api/v1/app/product/del/', 
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
    getProductApi,
    delProductApi
}