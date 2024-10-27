
import { useState } from "react";
import classes from "../../accets/styles/pages/menu/product.module.scss";
import classNames from "classnames";
import Tbl from "../../components/UI/Tbl";
import ChckBx from "../../components/UI/ChckBx";
import Pagination from "../../components/Pagination";
import { textAlign, sizeModal } from "../../services/typing/typeVar/styles";
import HeaderBtn from "../../components/HeaderBtn";
import Mdl from "../../components/UI/Mdl";


const Product = () => {

    const [show, setShow] = useState(false);

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    {/* <Mdl 
                        show={show} 
                        setShow={setShow} 
                        sizeModal={sizeModal.Small}
                        title={'Новый продукт'}
                    /> */}
                    <div className={classes.content__header}>
                        <HeaderBtn 
                            add={{
                                valueAdd: '228',
                                actionAdd: () => setShow(true)
                            }}
                            del={{}}
                        />
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
                                <span className={classes.content__footer__wrapper__number__text}>Найдено заказов: 1</span>
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