
import classes from "../../accets/styles/pages/menu/product.module.scss";
import classNames from "classnames";
import Btn from "../../components/UI/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Tbl from "../../components/UI/Tbl";
import ChckBx from "../../components/UI/ChckBx";
import Pagination from "../../components/Pagination";
import { textAlign } from "../../services/typing/typeVar/styles";


const Product = ({
    
}: any) => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__header}>
                        <div className={classes.content__header__btn}>
                            <Btn 
                                text={"Добавить заказ"} 
                                mainStyle={{width: "auto"}} 
                                btnStyle={{padding: "0 20px"}} 
                                after={<FontAwesomeIcon icon={faPlus} style={{marginLeft: "10px", fontSize: "1.5vh"}}/>}
                            />
                            <Btn 
                                text={"Удалить"} 
                                mainStyle={{width: "auto", marginLeft: "10px"}} 
                                btnStyle={{padding: "0 20px"}} 
                                after={<FontAwesomeIcon icon={faTrashCan} style={{marginLeft: "10px", fontSize: "1.5vh"}}/>}
                                btnCls={"main__inactive"}
                            />
                        </div>
                    </div>
                    <div className={classes.content__body}>
                        <Tbl
                            data={{
                                head: [
                                    {
                                        list: [
                                            '', 
                                            'Артикул',
                                            'Название продукта', 
                                            'Размер (мм)',
                                            'Для заказчика'
                                        ]
                                    },
                                ],
                                body: [
                                    {
                                        list: [
                                            <ChckBx state={false}/>, 
                                            '123232', 
                                            'TestTest123', 
                                            '54х31',
                                            'OOO "РФ"'
                                        ]
                                    },
                                    {
                                        list: [
                                            <ChckBx state={false}/>, 
                                            '123232', 
                                            'UHF LEG tag', 
                                            '100х10',
                                            'OOO "РФ"'
                                        ]
                                    },
                                    {
                                        list: [
                                            <ChckBx state={false}/>, 
                                            '123232', 
                                            'CandyTag', 
                                            '96х21',
                                            'OOO "РСТ"'
                                        ]
                                    }
                                ]
                            }}
                            totalStyle={{
                                striped: false,
                                bordered: false,
                            }}
                            headStyle={{}}
                            bodyStyle={{
                                horizontallyAlign: textAlign.Start
                            }}
                        />
                    </div>
                    <div className={classes.content__footer}>
                        <div className={classes.content__footer__wrapper}>
                            <div className={classes.content__footer__wrapper__number}>
                                <span>Найдено заказов: 1</span>
                            </div>
                            <div className={classes.content__footer__wrapper__pagination}>
                                <Pagination count={5} currentPage={2}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product