
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../accets/styles/pages/register.module.scss";
import logo from "../accets/images/nl1.png";
import Inpt from "../components/UI/Inpt";
import Btn from "../components/UI/Btn";
import rightArrow from "../accets/images/Vector.png";
import eye from "../accets/images/eye-off.png";
import Notification from "../components/UI/Notification";


const Login = () => {

    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__wrapper}>
                        <Notification 
                            mainText={"Новый пароль выслан на почту"} 
                            extraText={"На kakdela@gmail.com выслано письмо"} 
                            mainClr={"bColorMainGreen"}
                            imgClr={"colorImageGreen"}
                            lvl={""}
                        />
                        <div className={classes.content__wrapper__header}>
                            <div className={classes.content__wrapper__header__image}>
                                <img src={logo} alt="..." />
                            </div>
                        </div>
                        <div className={classes.content__wrapper__body}>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{fontSize: "17px"}}
                                    name={"Почта"}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{fontSize: "17px"}}
                                    name={"Телефон"}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{fontSize: "17px"}}
                                    name={"ФИО"}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{fontSize: "17px"}}
                                    name={"Наименование организации"}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={"text"} 
                                    inptStyle={{fontSize: "17px"}}
                                    name={"ИНН"}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={showPass ? "text" : "password"} 
                                    inptStyle={{fontSize: "17px", fontFamily: showPass ? "Montserrat" : "Verdana", letterSpacing: showPass ? "0.05em" : "0.125em"}}
                                    name={"Пароль"}
                                    after={<img src={eye} alt="..." style={{width: "24px", height: "24px", cursor: "pointer"}} onClick={() => setShowPass(!showPass)}/>}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__item}>
                                <Inpt 
                                    type={showRePass ? "text" : "password"} 
                                    inptStyle={{fontSize: "17px", fontFamily: showRePass ? "Montserrat" : "Verdana", letterSpacing: showRePass ? "0.05em" : "0.125em"}}
                                    name={"Подтверждение пароля"}
                                    after={<img src={eye} alt="..." style={{width: "24px", height: "24px", cursor: "pointer"}} onClick={() => setShowRePass(!showRePass)}/>}
                                />
                            </div>
                        </div>
                        <div className={classes.content__wrapper__footer}>
                            <Btn 
                                type={"button"} 
                                text={"Создать аккаунт"} 
                                after={<img src={rightArrow} style={{marginLeft: "10px"}}/>}  
                                btnStyle={{borderRadius: "7px", fontSize: "14px"}}
                                action={() => navigate('/login')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login