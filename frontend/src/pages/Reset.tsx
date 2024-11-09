
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../accets/styles/pages/reset.module.scss";
import logo from "../accets/images/nl1.png";
import Inpt from "../components/UI/Inpt";
import Btn from "../components/UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { sendEmailApi } from "../services/api/auth.api";
import { generalSlice } from "../services/store/reducers/general.dux";
import { useAppDispatch } from "../services/hooks/redux";


const Reset = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setLoading, setCurrentNotification } = generalSlice.actions;

    const [email, setEmail] = useState('');

    async function sendEmail () {
        dispatch(setLoading(true));
        const response = await sendEmailApi(email);

        if (response.status === 204) {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Пароль сброшен',
                extraText: `Ссылка для сброса отправлена на почту ${email}`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
            setEmail('');
            navigate('/login');
        }
        else {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка',
                extraText: `Не удалось сбросить пароль`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        };
        dispatch(setLoading(false));
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
                            <div className={classes.content__wrapper__body__btn}>
                                <div className={classes.content__wrapper__body__btn__reset} onClick={() => navigate('/login')}>Авторизоваться</div>
                            </div>
                        </div>
                        <div className={classes.content__wrapper__footer}>
                            <Btn 
                                type={"button"} 
                                text={"Сбросить"} 
                                after={<FontAwesomeIcon icon={faChevronRight} style={{marginLeft: "10px", fontSize: '1.5vh'}}/>} 
                                btnStyle={{borderRadius: "7px"}}
                                action={() => sendEmail()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reset