
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useState } from "react";
import classes from "../../accets/styles/pages/menu/factory.module.scss";
import classNames from 'classnames';
import Tbl from "../../components/UI/Tbl";
import Slct from "../../components/UI/Slct";
import ChckBx from "../../components/UI/ChckBx";
import Search from "../../components/UI/Search";
import Pagination from "../../components/Pagination";
import { textAlign, sizeModal } from "../../services/typing/typeVar/styles";
import HeaderBtn from "../../components/HeaderBtn";
import Mdl from "../../components/UI/Mdl";
import FactodyMdl from "../../components/BodyMdl/FactoryMdl";
import { addFactoryApi } from "../../services/api/factory";
import { useAppSelector, useAppDispatch } from "../../services/hooks/redux";
import { factorySlice } from "../../services/store/reducers/factory.dux";
import { getFactoryApi } from "../../services/api/factory";
import { constructTbl } from "../../services/hooks/other";


const Factory = () => {

    useEffect(() => {
        async function getFactory () {
            const response = await getFactoryApi(cookies.token);
    
            if (response.status === 200) {
                console.log(response);
                dispatch(setListFactory(response.data));
            }
            else {
                console.log(response);
            }
        };

        getFactory();
    }, []);

    const [show, setShow] = useState(false);
    const { newFactory, listFactory } = useAppSelector(state => state.factory);
    const dispatch = useAppDispatch();
    const { setListFactory } = factorySlice.actions
    const [cookies, _, __] = useCookies<string>(["user"]);
    const [ bodyTbl, setBodyTbl ] = useState();

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <Mdl 
                        show={show} 
                        setShow={setShow} 
                        sizeModal={sizeModal.Small}
                        title={'Новая фабрика'}
                        Body={FactodyMdl}
                        btnLeft={{
                            action: () => setShow(false),
                            text: 'Отмена'
                        }}
                        btnRight={{
                            action: () => addFactoryApi(cookies.token, newFactory),
                            text: 'Применить'
                        }}
                        bodyH='60vh'
                        bodyW='25vh'
                    />
                    <div className={classes.content__header}>
                        <HeaderBtn 
                            one={{
                                actionOne: () => setShow(true),
                                textOne: 'Добавить фабрику'
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
                                            <ChckBx state={false}/>,
                                            'ID', 
                                            'Название фабрики',
                                            'Телефон',
                                            'Email',
                                            'ФИО',
                                            'Регстр. номер',
                                        ]
                                    },
                                ],
                                body: constructTbl(listFactory, {
                                            list: [
                                                <ChckBx state={false}/>, 
                                                <Search/>,
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
                                                <Search/>,
                                                '', '', '',
                                            ]
                                })
                                    // {
                                    //     list: [
                                    //         <ChckBx state={false}/>, 
                                    //         '234', 
                                    //         'Фабрика "WER"', 
                                    //         '89119999999',
                                    //         'emailemail@mail.ru',
                                    //         'Иванов Иван Иванович',
                                    //         '1FR45U6E378TGHGH7',
                                    //     ]
                                    // }
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

export default Factory