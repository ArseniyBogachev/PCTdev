// 20.09.2024 20:21

// ['20', '09', '2024', '20', '21']

// 2024-09-20T20:21
export function reconstructDateTime(value: string, sep: string, schema: any[]): string {
    let result = '';
    const arr = value.split(new RegExp(sep));        // /[. :]+/
    schema.forEach(elem => {
        if (typeof elem === 'string') {
            result += elem;
        }
        else if (typeof elem === 'number') {
            result += arr[elem];
        };
    });
    return result;
};