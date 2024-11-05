
import axios from "axios";


async function addOrderApi(
    token: string,
    data: {
        xml: string
        factory: number
    }
) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/app/order/', 
            {
                xml: data.xml, 
                factory: data.factory, 
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


async function addQuantityProductApi(
    token: string,
    data: {
        order: number
        quantityProduct: {
            product: number
            quantity: number
        }[]
    }
) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/app/quantity_product/create/', 
            {
                order: data.order, 
                quantity_product: data.quantityProduct, 
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


async function getFactoryProductApi(
    token: string,
) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/factory_product/list/', 
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


async function getOrderApi(
    token: string,
) {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/order/',
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
    getFactoryProductApi,
    addQuantityProductApi,
    addOrderApi,
    getOrderApi,
}