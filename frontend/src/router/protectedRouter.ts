
import { User } from "../services/typing/interfaces/store/user.interfaces";


const auth = [
    '/login',
    '/register',
    '/',
    '/reset'
];

const notAuth = [
    '/factory',
    '/order',
    '/user',
    '/profile',
    '/product'
];

const notRight = [
    '/user',
    '/product'
]

export function checkUrl (url: string, navigate: any, user?: User,) {
    if (auth.find(item => item === url) && user) {
        navigate('/profile');
        return
    }
    else if (notAuth.find(item => item === url) && !user) {
        navigate('/login');
        return
    }
    else if (notRight.find(item => item === url) && !user.is_superuser) {
        navigate('/profile');
        return
    }
}