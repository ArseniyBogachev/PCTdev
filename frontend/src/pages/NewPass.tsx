
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../accets/styles/pages/newPass.module.scss";
import logo from "../accets/images/nl1.png";
import Inpt from "../components/UI/Inpt";
import Btn from "../components/UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { updatePasswordApi } from "../services/api/auth.api";
import { generalSlice } from "../services/store/reducers/general.dux";
import { useAppDispatch } from "../services/hooks/redux";


const NewPass = () => {

    const navigate = useNavigate();
    const { uid, token } = useParams();
    const dispatch = useAppDispatch();
    const { setLoading, setCurrentNotification } = generalSlice.actions;

    const [showPass, setShowPass] = useState<boolean>(false);
    const [reShowPass, setReShowPass] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [errorPass, setErrorPass] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });
    const [errorRePass, setErrorRePass] = useState<{state: boolean, message: string}>({
        state: false,
        message: ''
    });

    function validate (): boolean {
        setErrorPass({state: false, message: ''});
        setErrorRePass({state: false, message: ''});

        if (password !== rePassword) {
            setErrorPass({state: true, message: ''});
            setErrorRePass({state: true, message: 'Пароли не совпадают'});
            return false
        }
        else if (password.length < 8) {
            setErrorPass({state: true, message: 'Пароль менее 8 символов'});
            return false
        }
        return true
    };

    async function updatePassword () {
        dispatch(setLoading(true));
        const response = await updatePasswordApi({uid: uid, token: token, new_password: password});

        if (response.status === 204) {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Изменено',
                extraText: `Пароль изменен на новый`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
            navigate('/login', { replace: true });
        }
        else {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка',
                extraText: `Не удалось изменить пароль`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
        dispatch(setLoading(false));
    };

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
                            <div className={classes.content__wrapper__body__pass}>
                                <Inpt 
                                    type={showPass ? "text" : "password"} 
                                    inptStyle={{fontFamily: showPass ? "Montserrat" : "Verdana", letterSpacing: showPass ? "0.05em" : "0.125em", borderRadius: "7px"}}
                                    name={"Новый пароль"}
                                    value={password}
                                    setValue={setPassword}
                                    after={<FontAwesomeIcon icon={faEyeSlash} style={{fontSize: '2.5vh', cursor: "pointer", color: '#9D9BB4'}} onClick={() => setShowPass(!showPass)}/>}
                                    stateError={errorPass.state}
                                    textError={errorPass.message}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__pass}>
                                <Inpt 
                                    type={reShowPass ? "text" : "password"} 
                                    inptStyle={{fontFamily: reShowPass ? "Montserrat" : "Verdana", letterSpacing: reShowPass ? "0.05em" : "0.125em", borderRadius: "7px"}}
                                    name={"Повторите пароль"}
                                    value={rePassword}
                                    setValue={setRePassword}
                                    after={<FontAwesomeIcon icon={faEyeSlash} style={{fontSize: '2.5vh', cursor: "pointer", color: '#9D9BB4'}} onClick={() => setShowPass(!setReShowPass)}/>}
                                    stateError={errorRePass.state}
                                    textError={errorRePass.message}
                                />
                            </div>
                        </div>
                        <div className={classes.content__wrapper__footer}>
                            <Btn 
                                type={"button"} 
                                text={"Отправить"} 
                                after={<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "10px", fontSize: '1.5vh'}}/>} 
                                btnStyle={{borderRadius: "7px"}}
                                action={async () => {
                                    if (validate()) {
                                        await updatePassword();
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

export default NewPass