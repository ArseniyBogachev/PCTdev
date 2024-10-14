
import { useState } from "react";
import classes from "../accets/styles/pages/login.module.scss";
import logo from "../accets/images/nl1.png";
import Inpt from "../components/UI/Inpt";
import Btn from "../components/UI/Btn";
import rightArrow from "../accets/images/Vector.png"
import eye from "../accets/images/eye-off.png"


const Login = () => {

    const [showPass, setShowPass] = useState(false);

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
                                    inptStyle={{fontSize: "17px"}}
                                    name={"Почта"}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__pass}>
                                <Inpt 
                                    type={showPass ? "text" : "password"} 
                                    inptStyle={{fontSize: "17px", fontFamily: showPass ? "Montserrat" : "Verdana", letterSpacing: showPass ? "0.05em" : "0.125em"}}
                                    name={"Пароль"}
                                    after={<img src={eye} alt="..." style={{width: "24px", height: "24px", cursor: "pointer"}} onClick={() => setShowPass(!showPass)}/>}
                                />
                            </div>
                        </div>
                        <div className={classes.content__wrapper__footer}>
                            <Btn 
                                type={"button"} 
                                text={"Вход"} 
                                after={<img src={rightArrow} style={{marginLeft: "10px"}}/>} 
                                // mainStyle={{height: '10%'}} 
                                btnStyle={{borderRadius: "7px", fontSize: "14px"}}
                                // action={() => navigate('/login')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login