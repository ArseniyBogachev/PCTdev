// 20.09.2024 20:21

// import Notification from "../../components/UI/Notification"; 
import { GeneralNotification } from "../typing/interfaces/store/general.interfaces";



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


export function constructTbl (list: any, filter?: {}): any {
    let result: any[] = [];
    // console.log(list)

    if (filter) {
        console.log(filter)
        // result = [{list: filter}, {list: Object.values(list[0])}];
    };

    list.forEach((item: any) => {
        // console.log('Object.values(item)', Object.values(item))
        result.push({list: Object.values(item)});
    });

    // console.log(result)
    console.log('list', list)

    return result
}
