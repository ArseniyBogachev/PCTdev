
import classes from "../../accets/styles/pages/menu/order.module.scss";
import classNames from 'classnames';
import Btn from "../../components/UI/Btn";
import plus from "../../accets/images/Plus.png";
import trash from "../../accets/images/Trash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Tbl from "../../components/UI/Tbl";
import Slct from "../../components/UI/Slct";
import ChckBx from "../../components/UI/ChckBx";
import Filter from "../../components/UI/Filter";
import Search from "../../components/UI/Search";
import Download from "../../components/UI/Download";
import EditDataInpt from "../../components/UI/EditDataInpt";
import { useState } from "react";
import { reconstructDateTime } from "../../services/hooks/other";


const Order = ({
    
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
                                after={<FontAwesomeIcon icon={faPlus} style={{marginLeft: "10px", transform: "translate(0, 10%)", fontSize: "15px"}}/>}
                            />
                            <Btn 
                                text={"Удалить"} 
                                mainStyle={{width: "auto", marginLeft: "10px"}} 
                                btnStyle={{padding: "0 20px"}} 
                                after={<FontAwesomeIcon icon={faTrashCan} style={{marginLeft: "10px", transform: "translate(0, 10%)", fontSize: "15px"}}/>}
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
                                            <ChckBx state={true}/>, 
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
                                            <Search active={true}/>, 
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
                                            <ChckBx state={false}/>, 
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
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order