
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../accets/styles/pages/register.module.scss";
import logo from "../accets/images/nl1.png";
import Inpt from "../components/UI/Inpt";
import Btn from "../components/UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { registerApi } from "../services/api/auth.api";
import { generalSlice } from "../services/store/reducers/general.dux";
import { useAppDispatch } from "../services/hooks/redux";
import { emailPattern, phonePattern } from "../services/validate/pattern";


const Login = () => {

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [fio, setFio] = useState<string>();
    const [organization, setOrganization] = useState<string>();
    const [inn, setInn] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [rePassword, setRePassword] = useState();
    const [errPass, setErrPass] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });
    const [errEmail, setErrEmail] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });
    const [errPhone, setErrPhone] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });
    const [errFio, setErrFio] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });
    const [errOrganization, setErrOrganization] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });
    const [errInn, setErrInn] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });

    const { setCurrentNotification, setLoading } = generalSlice.actions;
    const dispatch = useAppDispatch()

    function validateReg () {
        setErrPass({state: false, message: ''});
        setErrEmail({state: false, message: ''});
        setErrPhone({state: false, message: ''});
        setErrFio({state: false, message: ''});
        setErrOrganization({state: false, message: ''});
        setErrInn({state: false, message: ''});

        if (!emailPattern.test(email)) {
            setErrEmail({state: true, message: 'Некорректный ввод EMAIL'});
            return false
        }
        else if (!phonePattern.test(phone)) {
            setErrPhone({state: true, message: 'Некорректный ввод номера'});
            return false
        }
        else if (fio.length < 1) {
            setErrFio({state: true, message: 'Введите ФИО'});
            return false
        }
        else if (organization.length < 1) {
            setErrOrganization({state: true, message: 'Введите организацию'});
            return false
        }
        else if (inn.length < 1) {
            setErrInn({state: true, message: 'Введите ИНН'});
            return false
        }
        else if (password !== rePassword) {
            setErrPass({state: true, message: 'Пароли не совпадают'});
            return false
        }
        else if (password.length < 8) {
            setErrPass({state: true, message: 'Пароль менее 8 символов'});
            return false
        }
        return true
    }

    async function register () {
        dispatch(setLoading(true))
        const response = await registerApi(email, phone, fio, organization, inn, password);
        
        if (response.status === 201) {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Аккаунт создан',
                extraText: `На ${email} выслано письмо`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
            navigate('/login');
        }
        else {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка при регистрации',
                extraText: 'Проверьте введенные данные',
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => {dispatch(setCurrentNotification(false))}, 5100);
        }
        dispatch(setLoading(false))
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
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"Почта"}
                                    value={email}
                                    setValue={setEmail}
                                    stateError={errEmail.state}
                                    textError={errEmail.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"Телефон"}
                                    value={phone}
                                    setValue={setPhone}
                                    stateError={errPhone.state}
                                    textError={errPhone.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"ФИО"}
                                    value={fio}
                                    setValue={setFio}
                                    stateError={errFio.state}
                                    textError={errFio.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"Наименование организации"}
                                    value={organization}
                                    setValue={setOrganization}
                                    stateError={errOrganization.state}
                                    textError={errOrganization.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"ИНН"}
                                    value={inn}
                                    setValue={setInn}
                                    stateError={errInn.state}
                                    textError={errInn.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={showPass ? "text" : "password"} 
                                    inptStyle={{fontFamily: showPass ? "Montserrat" : "Verdana", letterSpacing: showPass ? "0.05em" : "0.125em", borderRadius: '7px'}}
                                    name={"Пароль"}
                                    value={password}
                                    setValue={setPassword}
                                    after={<FontAwesomeIcon icon={faEyeSlash} style={{fontSize: '2.5vh', cursor: "pointer", color: '#9D9BB4'}} onClick={() => setShowPass(!showPass)}/>}
                                    stateError={errPass.state}
                                    textError={errPass.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={showRePass ? "text" : "password"} 
                                    inptStyle={{fontFamily: showRePass ? "Montserrat" : "Verdana", letterSpacing: showRePass ? "0.05em" : "0.125em", borderRadius: '7px'}}
                                    name={"Подтверждение пароля"}
                                    value={rePassword}
                                    setValue={setRePassword}
                                    after={<FontAwesomeIcon icon={faEyeSlash} style={{fontSize: '2.5vh', cursor: "pointer", color: '#9D9BB4'}} onClick={() => setShowRePass(!showRePass)}/>}
                                    stateError={errPass.state}
                                    textError={errPass.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__login} onClick={() => navigate('/login')}>Авторизоваться</div>
                        </div>
                        <div className={classes.content__wrapper__footer}>
                            <Btn 
                                type={"button"} 
                                text={"Создать аккаунт"} 
                                after={<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "10px", fontSize: '1.5vh'}}/>}  
                                btnStyle={{borderRadius: "7px"}}
                                action={async () => {
                                    if (validateReg()) {
                                        await register();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login