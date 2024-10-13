
import classes from "../accets/styles/pages/home.module.scss";
import Btn from "../components/UI/Btn";
import logo from "../accets/images/nl1.png";


const Home = () => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__wrapper}>
                        <div className={classes.content__wrapper__header}>
                            <img src={logo} alt="..." />
                        </div>
                        <div className={classes.content__wrapper__body}>
                            <div className={classes.content__wrapper__body__label}>
                                <div className={classes.content__wrapper__body__label__text}>Система оформления заказов</div>
                            </div>
                            <div className={classes.content__wrapper__body__enter}>
                                <Btn type={'button'} text={'Войти в аккаунт'} mainStyle={{height: '40%'}} btnStyle={{borderRadius: '7px'}}/>
                                <Btn type={'button'} text={'Создать аккаунт'} mainStyle={{height: '40%'}} btnStyle={{borderRadius: '7px'}}/>
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