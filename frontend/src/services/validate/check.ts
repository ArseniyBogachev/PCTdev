
export function hasUndefinedFromQP (list: {product: number | undefined, quantity: number | undefined}[]) {
    const result = list.find(item => {
        if (item.product === undefined || item.quantity === undefined) {
            return true
        }
        return false
    });

    return Boolean(result);
}