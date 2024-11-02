
import { useState } from "react";
import classes from "../../accets/styles/pages/menu/order.module.scss";
import classNames from 'classnames';
import Tbl from "../../components/UI/Tbl";
import Slct from "../../components/UI/Slct";
import ChckBx from "../../components/UI/ChckBx";
import Filter from "../../components/UI/Filter";
import Search from "../../components/UI/Search";
import Download from "../../components/UI/Download";
import EditDataInpt from "../../components/UI/EditDataInpt";
import { reconstructDateTime } from "../../services/hooks/other";
import Pagination from "../../components/Pagination";
import { textAlign, sizeModal } from "../../services/typing/typeVar/styles";
import HeaderBtn from "../../components/HeaderBtn";
import Mdl from "../../components/UI/Mdl";
import OrderMdl from "../../components/BodyMdl/OrderMdl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const Order = () => {

    const [show, setShow] = useState(false);

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <Mdl 
                        show={show} 
                        setShow={setShow}
                        sizeModal={sizeModal.Large}
                        title={'Добавить заказ'}
                        Body={OrderMdl}
                        btnLeft={{
                            action: () => setShow(false),
                            text: 'Отмена'
                        }}
                        btnRight={{
                            action: () => setShow(false),
                            text: 'Импортировать',
                            after: <FontAwesomeIcon icon={faPlus} style={{marginLeft: '10px'}}></FontAwesomeIcon>
                        }}
                        bodyH='55vh'
                        bodyW='24vh'
                    />
                    <div className={classes.content__header}>
                        <HeaderBtn
                            one={{
                                valueOne: '228',
                                actionOne: () => setShow(true),
                                textOne: 'Добавить заказ'
                            }}
                            two={{textTwo: 'Удалить'}}
                        />
                    </div>
                    <div className={classes.content__body}>
                        <Tbl 
                            data={{
                                head: [
                                    {
                                        list: [
                                            // <ChckBx state={true}/>, 
                                            <Filter text={'ID'}/>,
                                            'Заказчик', 
                                            <Filter text={'Фабрика'}/>,
                                            <Filter text={'Статус'}/>,
                                            'Получ. заказа',
                                            'Дата отгрузки',
                                            'Получ. фабр.',
                                            'XML',
                                            'Продукция (шт.)',
                                        ]
                                    },
                                ],
                                body: [
                                    {
                                        list: [
                                            '', 
                                            <Search />, 
                                            <Slct 
                                                data={[
                                                    {
                                                        id: 1,
                                                        text: 'test one'
                                                    },
                                                    {
                                                        id: 2,
                                                        text: 'test two'
                                                    },
                                                    {
                                                        id: 3,
                                                        text: 'test three'
                                                    }
                                                ]}
                                                currentItem={1}
                                            />, 
                                            <Slct 
                                                data={[
                                                    {
                                                        id: 1,
                                                        text: 'test one'
                                                    },
                                                    {
                                                        id: 2,
                                                        text: 'test two'
                                                    },
                                                    {
                                                        id: 3,
                                                        text: 'test three'
                                                    }
                                                ]}
                                                currentItem={1}
                                            />,
                                            <Slct 
                                                data={[
                                                    {
                                                        id: 1,
                                                        text: 'test one'
                                                    },
                                                    {
                                                        id: 2,
                                                        text: 'test two'
                                                    },
                                                    {
                                                        id: 3,
                                                        text: 'test three'
                                                    }
                                                ]}
                                                currentItem={1}
                                            />,
                                            '', '', '', '', '',
                                        ]
                                    },
                                    {
                                        list: [
                                            // <ChckBx state={false}/>, 
                                            '123232', 
                                            'TestTest123', 
                                            'Фабрика "WER"',
                                            <Slct 
                                                data={[
                                                    {
                                                        id: 1,
                                                        text: 'Принято фабрикой'
                                                    },
                                                    {
                                                        id: 2,
                                                        text: 'Добавлен заказчиком'
                                                    },
                                                    {
                                                        id: 3,
                                                        text: 'Принято в работу'
                                                    },
                                                    {
                                                        id: 4,
                                                        text: 'Заказ отгружен'
                                                    }
                                                ]}
                                                currentItem={1}
                                            />,
                                            '20.09.2024 20:21',
                                            <EditDataInpt 
                                                type={'datetime-local'} 
                                                text={'20.09.2024 20:21'}
                                                value={reconstructDateTime('20.09.2024 20:21', '[. :]+', [2, '-', 1, '-', 0, 'T', 3, ':', 4])}
                                            />,
                                            '20.09.2024 20:21',
                                            <Download text={'Скачать'}/>,
                                            'UHW LED tag(1000)'
                                        ]
                                    }
                                ]
                            }}
                            totalStyle={{
                                striped: false,
                                bordered: true,
                            }}
                            headStyle={{}}
                            bodyStyle={{
                                horizontallyAlign: textAlign.Center
                            }}
                        />
                    </div>
                    <div className={classes.content__footer}>
                        <div className={classes.content__footer__wrapper}>
                            <div className={classes.content__footer__wrapper__number}>
                                <span className={classes.content__footer__wrapper__number__text}>Найдено заказов: 1</span>
                            </div>
                            <div className={classes.content__footer__wrapper__pagination}>
                                {/* <Pagination count={5} currentPage={2}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order