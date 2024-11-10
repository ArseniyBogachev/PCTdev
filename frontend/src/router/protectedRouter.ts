
import { User } from "../services/typing/interfaces/store/user.interfaces";


const auth = [
    new RegExp('^/login$'),
    new RegExp('^/register$'),
    new RegExp('^/$'),
    new RegExp('^/reset$'),
    new RegExp("^/new/password/\\w{3}/\\w{6}-\\w+$")
];

const notAuth = [
    new RegExp('^/factory$'),
    new RegExp('^/order$'),
    new RegExp('^/user$'),
    new RegExp('^/profile$'),
    new RegExp('^/product$')
];

const notRight = [
    new RegExp('^/user$'),
    new RegExp('^/product$')
]

export function checkUrl (url: string, navigate: any, user?: User,) {
    console.log('url', url)
    console.log('user', user)
    if (auth.find(item => {
        console.log('item -> ', item);
        console.log('item.test(url) -> ', item.test(url))
        return item.test(url)
    }) && user) {
        console.log('1')
        navigate('/profile');
        return
    }
    else if (notAuth.find(item => item.test(url)) && !user) {
        console.log('2')
        navigate('/login');
        return
    }
    else if (notRight.find(item => item.test(url)) && !user.is_superuser) {
        console.log('3')
        navigate('/profile');
        return
    }
}