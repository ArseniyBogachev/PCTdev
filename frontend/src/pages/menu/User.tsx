
import { useState } from "react";
import classes from "../../accets/styles/pages/menu/user.module.scss";
import classNames from 'classnames';
import Tbl from "../../components/UI/Tbl";
import Slct from "../../components/UI/Slct";
import ChckBx from "../../components/UI/ChckBx";
import Search from "../../components/UI/Search";
import Pagination from "../../components/Pagination";
import { textAlign, sizeModal } from "../../services/typing/typeVar/styles";
import DropdownList from "../../components/UI/DropdownList";
import HeaderBtn from "../../components/HeaderBtn";
import Mdl from "../../components/UI/Mdl";


const User = () => {

    const [show, setShow] = useState(false);

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    {/* <Mdl 
                        show={show} 
                        setShow={setShow} 
                        sizeModal={sizeModal.Small}
                        title={'Новый пользователь'}
                    /> */}
                    <div className={classes.content__header}>
                        <HeaderBtn 
                            add={{
                                text: 'Добавить пользователя'
                            }} 
                            del={{
                                text: 'Удалить'
                            }}
                        />
                    </div>
                    <div className={classes.content__body}>
                        <Tbl 
                            data={{
                                head: [
                                    {
                                        list: [
                                            '', 
                                            'Наименование организации', 
                                            'Логин/почта',
                                            'Телефон',
                                            'ФИО',
                                            'ИНН',
                                            'Фабрики',
                                        ]
                                    },
                                ],
                                body: [
                                    {
                                        list: [
                                            <ChckBx state={false}/>, 
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
                                            '',
                                            '',
                                            '',
                                            <Search />
                                        ]
                                    },
                                    {
                                        list: [
                                            <ChckBx state={false}/>, 
                                            'OOO РФ', 
                                            'kakdela@gmail.com', 
                                            '89119999999',
                                            'Иванов Иван Иванович',
                                            '11111111',
                                            <DropdownList count={2} list={['Фабрика "WER"', 'Фабрика "UAR"', 'Фабрика "ERR"', 'Фабрика "ERR"']}/>
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

export default User