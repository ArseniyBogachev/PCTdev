
export function reconstructDateTime (value: string, sep: string, schema: any[]): string {
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


export function range (start: number, end?: number, step: number = 1): number[] {
    let result = [];

    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    };

    for (let i = start; i < end; i += step) {
        result.push(i);
    };

    return result;
};


export function constructTbl (list: any, extra: {index: number, step: number, elem?: React.FC | undefined, props?: any}[]): any {
    let result: any[] = [];

    list.forEach((item: any) => {
        const add = {list: Object.values(item)};
        extra.forEach((ex: {index: number, step: number, elem: React.FC, props: any}) => {
            if (ex.elem) {
                add.list.splice(ex.index, ex.step, ex.elem(ex.props.find((prop: any) => prop.id === item.id)))
            }
            else {
                add.list.splice(ex.index, ex.step)
            }
        });
        result.push(add);
    });

    result.forEach((item: any) => {
        item.list.splice()
    })

    return result;
}


export function getNestingFromObj (list: any[], state: any, nesting: string) {
    return list.filter(itemF => itemF.state === state).map(itemM => itemM[nesting]);
};
