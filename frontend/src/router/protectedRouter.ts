
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
    if (auth.find(item => item.test(url)) && user) {
        navigate('/profile');
        return
    }
    else if (notAuth.find(item => item.test(url)) && !user) {
        navigate('/login');
        return
    }
    else if (notRight.find(item => item.test(url)) && !user.is_superuser) {
        navigate('/profile');
        return
    }
}