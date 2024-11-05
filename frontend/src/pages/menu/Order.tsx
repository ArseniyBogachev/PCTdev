
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
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
import { getFactoryProductApi, addOrderApi, addQuantityProductApi, getOrderApi } from "../../services/api/order.api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { orderSlice } from "../../services/store/reducers/order.dux";
import { constructTbl } from "../../services/hooks/other";
import DropdownList from "../../components/UI/DropdownList";


const Order = () => {

    const [show, setShow] = useState(false);
    const [cookies, _, __] = useCookies<string>(["user"]);
    const dispatch = useAppDispatch();
    const { listProductFactory, newOrder, listOrderAdmin, listChkBx } = useAppSelector(state => state.order);
    const { setListProductFactory, setListOrderAdmin, setListChkBx, detailSetListChkBx } = orderSlice.actions;

    async function getFactoryProduct () {
        const responseOrder = await getOrderApi(cookies.token);

        if (responseOrder.status === 200) {
            const responsePF = await getFactoryProductApi(cookies.token);

            if (responsePF.status === 200) {
                console.log('responsePF -> ', responsePF);
                console.log('responseOrder -> ', responseOrder);
                dispatch(setListProductFactory(responsePF.data));
                dispatch(setListOrderAdmin(responseOrder.data.results));
                dispatch(setListChkBx(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    state: false,
                    setState: () => dispatch(detailSetListChkBx(item.id))
                }))));
            }
            else {
                console.log(responsePF)
            }
        }
        else {
            console.log(responseOrder);
        }
    };

    async function addOrder () {
        const responseOrder = await addOrderApi(cookies.token, {
            xml: newOrder.xml,
            factory: newOrder.factory
        });

        if (responseOrder.status === 200) {
            const responseQP = await addQuantityProductApi(cookies.token, {
                order: responseOrder.data.id,
                quantityProduct: newOrder.quantityProduct,
            });


            if (responseQP.status === 200) {
                setShow(false);
            }
            else {
                console.log(responseQP);
            }
        }
        else {
            console.log(responseOrder);
        }
    };

    useEffect(() => {
        getFactoryProduct()
    }, []);

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
                            action: async () => {
                                setShow(false);
                                await addOrder();
                            },
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
                                filter: {
                                    list: [
                                        '', 
                                        <Search />, 
                                        <Slct 
                                            data={[
                                                {
                                                    id: 1,
                                                    name: 'test one'
                                                },
                                                {
                                                    id: 2,
                                                    name: 'test two'
                                                },
                                                {
                                                    id: 3,
                                                    name: 'test three'
                                                }
                                            ]}
                                            state={1}
                                            setState={() => {}}
                                        />, 
                                        <Slct 
                                            data={[
                                                {
                                                    id: 1,
                                                    name: 'test one'
                                                },
                                                {
                                                    id: 2,
                                                    name: 'test two'
                                                },
                                                {
                                                    id: 3,
                                                    name: 'test three'
                                                }
                                            ]}
                                            state={1}
                                            setState={() => {}}
                                        />,
                                        <Slct 
                                            data={[
                                                {
                                                    id: 1,
                                                    name: 'test one'
                                                },
                                                {
                                                    id: 2,
                                                    name: 'test two'
                                                },
                                                {
                                                    id: 3,
                                                    name: 'test three'
                                                }
                                            ]}
                                            state={1}
                                            setState={() => {}}
                                        />,
                                        '', '', '', '', '',
                                    ]
                                },
                                body: constructTbl(listOrderAdmin, [
                                    {index: 0, step: 0, elem: ChckBx, props: listChkBx},
                                    // {index: 7, step: 1, elem: DropdownList, props: }
                                ])
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





// {
//     list: [
//         // <ChckBx state={false}/>, 
//         '123232', 
//         'TestTest123', 
//         'Фабрика "WER"',
//         <Slct 
//             data={[
//                 {
//                     id: 1,
//                     name: 'Принято фабрикой'
//                 },
//                 {
//                     id: 2,
//                     name: 'Добавлен заказчиком'
//                 },
//                 {
//                     id: 3,
//                     name: 'Принято в работу'
//                 },
//                 {
//                     id: 4,
//                     name: 'Заказ отгружен'
//                 }
//             ]}
//             state={1}
//             setState={() => {}}
//         />,
//         '20.09.2024 20:21',
//         <EditDataInpt 
//             type={'datetime-local'} 
//             text={'20.09.2024 20:21'}
//             value={reconstructDateTime('20.09.2024 20:21', '[. :]+', [2, '-', 1, '-', 0, 'T', 3, ':', 4])}
//         />,
//         '20.09.2024 20:21',
//         <Download text={'Скачать'}/>,
//         'UHW LED tag(1000)'
//     ]
// }