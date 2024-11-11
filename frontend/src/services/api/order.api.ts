
import axios from "axios";


async function addOrderApi(
    token: string,
    data: {
        xml: string
        factory: number
    }
) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/app/order/`, 
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
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/app/quantity_product/create/`, 
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
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/app/factory_product/list/`, 
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
    page: number | undefined = 1,
    filter: {id?: string | undefined, factory?: string | null, status?: string | null, ordering?: string | null},
) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/v1/app/order/`,
            {
                params: {
                    page: page,
                    id: filter.id,
                    factory__name: filter.factory,
                    ordering: filter.ordering,
                    status: filter.status
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


async function delOrderApi(
    token: string,
    data: number[]
) {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER}/api/v1/app/order/del/`, 
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


async function updateOrderApi(
    token: string,
    data: {status?: number | undefined, shipping_date?: Date | undefined, accepted_factory?: Date | undefined},
    id: number
) {
    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER}/api/v1/app/order/update/${id}`, 
            data,
            {
                headers: {
                    "Authorization": `Token ${token}`
                },
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
    delOrderApi,
    updateOrderApi
}