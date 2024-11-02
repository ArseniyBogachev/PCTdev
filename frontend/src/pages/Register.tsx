
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../accets/styles/pages/register.module.scss";
import logo from "../accets/images/nl1.png";
import Inpt from "../components/UI/Inpt";
import Btn from "../components/UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { registerApi } from "../services/api/auth";
import { generalSlice } from "../services/store/reducers/general.dux";
import { useAppDispatch } from "../services/hooks/redux";


const Login = () => {

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [fio, setFio] = useState();
    const [organization, setOrganization] = useState();
    const [inn, setInn] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();

    const { addListNotification, setLoading } = generalSlice.actions;
    const dispatch = useAppDispatch()

    async function register () {
        dispatch(setLoading(true))
        const response = await registerApi(email, phone, fio, organization, inn, password);
        
        if (response.status === 201) {
            dispatch(addListNotification({
                type: 'fixed',
                mainText: 'Добавлена новая фабрика',
                extraText: `На ${email} выслано письмо`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            navigate('/login');
        }
        else {
            dispatch(addListNotification({
                type: 'fixed',
                mainText: 'Ошибка при регистрации',
                extraText: 'Проверьте введенные данные',
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
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
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"Телефон"}
                                    value={phone}
                                    setValue={setPhone}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"ФИО"}
                                    value={fio}
                                    setValue={setFio}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"Наименование организации"}
                                    value={organization}
                                    setValue={setOrganization}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{borderRadius: '7px'}}
                                    name={"ИНН"}
                                    value={inn}
                                    setValue={setInn}
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
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={showRePass ? "text" : "password"} 
                                    inptStyle={{fontFamily: showRePass ? "Montserrat" : "Verdana", letterSpacing: showRePass ? "0.05em" : "0.125em", borderRadius: '7px'}}
                                    name={"Подтверждение пароля"}
                                    value={rePassword}
                                    setValue={setRePassword}
                                    after={<FontAwesomeIcon icon={faEyeSlash} style={{fontSize: '2.5vh', cursor: "pointer", color: '#9D9BB4'}} onClick={() => setShowPass(!showPass)}/>}
                                />
                            </div>
                        </div>
                        <div className={classes.content__wrapper__footer}>
                            <Btn 
                                type={"button"} 
                                text={"Создать аккаунт"} 
                                after={<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "10px", fontSize: '1.5vh'}}/>}  
                                btnStyle={{borderRadius: "7px"}}
                                action={() => register()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login