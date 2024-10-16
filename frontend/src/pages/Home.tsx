
import classes from "../accets/styles/pages/home.module.scss";
import Btn from "../components/UI/Btn";
import logo from "../accets/images/nl1.png";
import rightArrow from "../accets/images/Vector.png"
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate(); 

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__wrapper}>
                        <div className={classes.content__wrapper__header}>
                            <div className={classes.content__wrapper__header__image}>
                                <img src={logo} alt="..." />
                            </div>
                            <div className={classes.content__wrapper__header__language}>
                                <span>RU/EN</span>
                            </div>
                        </div>
                        <div className={classes.content__wrapper__body}>
                            <div className={classes.content__wrapper__body__label}>
                                <div className={classes.content__wrapper__body__label__text}>Система оформления заказов</div>
                            </div>
                            <div className={classes.content__wrapper__body__enter}>
                                <Btn 
                                    type={'button'} 
                                    text={'Войти в аккаунт'} 
                                    after={<img src={rightArrow} style={{marginLeft: "10px"}}/>} 
                                    mainStyle={{height: '40%'}} 
                                    btnStyle={{borderRadius: '7px'}}
                                    action={() => navigate('/login')}
                                />
                                <Btn 
                                    type={'button'} 
                                    text={'Создать аккаунт'} 
                                    after={<img src={rightArrow} style={{marginLeft: "10px"}}/>} 
                                    mainStyle={{height: '40%'}} 
                                    btnStyle={{borderRadius: '7px'}}
                                    action={() => navigate('/register')}
                                />
                            </div>
                            <div className={classes.content__wrapper__body__restore}>
                                <div className={classes.content__wrapper__body__restore__text}>Восстановить доступ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home