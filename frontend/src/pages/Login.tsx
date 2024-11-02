
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import classes from "../accets/styles/pages/login.module.scss";
import logo from "../accets/images/nl1.png";
import Inpt from "../components/UI/Inpt";
import Btn from "../components/UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { loginApi } from "../services/api/auth";
import { generalSlice } from "../services/store/reducers/general.dux";
import { useAppDispatch } from "../services/hooks/redux";



const Login = () => {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies<string>(['user']);

    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { addListNotification, setLoading } = generalSlice.actions;
    const dispatch = useAppDispatch()

    async function login () {
        setLoading(true)
        const response = await loginApi(email, password);

        if (response.status === 200) {
            dispatch(addListNotification({
                type: 'fixed',
                mainText: 'Успешная авторизация',
                extraText: `Вход выполнен под почтой ${email}`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setCookie('token', response.data.auth_token);
            navigate('/order', { replace: true });
            console.log(response);
        }
        else {
            dispatch(addListNotification({
                type: 'fixed',
                mainText: 'Не удалось авторизоваться',
                extraText: `Некорректные данные пользователя`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            console.log(response);
        }
        setLoading(false)
    }

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__wrapper}>
                        <div className={classes.content__wrapper__header}>
                            <div className={classes.content__wrapper__header__image}>
                                <img src={logo} alt="..." />
                            </div>
                        </div>
                        <div className={classes.content__wrapper__body}>
                            <div className={classes.content__wrapper__body__login}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: "7px"}}
                                    name={"Почта"}
                                    value={email}
                                    setValue={setEmail}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__pass}>
                                <Inpt 
                                    type={showPass ? "text" : "password"} 
                                    inptStyle={{fontFamily: showPass ? "Montserrat" : "Verdana", letterSpacing: showPass ? "0.05em" : "0.125em", borderRadius: "7px"}}
                                    name={"Пароль"}
                                    value={password}
                                    setValue={setPassword}
                                    after={<FontAwesomeIcon icon={faEyeSlash} style={{fontSize: '2.5vh', cursor: "pointer", color: '#9D9BB4'}} onClick={() => setShowPass(!showPass)}/>}
                                />
                            </div>
                        </div>
                        <div className={classes.content__wrapper__footer}>
                            <Btn 
                                type={"button"} 
                                text={"Вход"} 
                                after={<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "10px", fontSize: '1.5vh'}}/>} 
                                btnStyle={{borderRadius: "7px"}}
                                action={() => login()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login