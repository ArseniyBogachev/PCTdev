
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
import EditDataInpt from "../../components/UI/EditDateInpt";
import { currentOrdering, reconstructDateTime } from "../../services/hooks/other";
import Pagination from "../../components/Pagination";
import { textAlign, sizeModal } from "../../services/typing/typeVar/styles";
import HeaderBtn from "../../components/HeaderBtn";
import Mdl from "../../components/UI/Mdl";
import OrderMdl from "../../components/BodyMdl/OrderMdl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getFactoryProductApi, addOrderApi, addQuantityProductApi, getOrderApi, delOrderApi } from "../../services/api/order.api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { orderSlice } from "../../services/store/reducers/order.dux";
import { constructTbl } from "../../services/hooks/other";
import DropdownList from "../../components/UI/DropdownList";
import { getNestingFromObj } from "../../services/hooks/other";
import { generalSlice } from "../../services/store/reducers/general.dux";


const Order = () => {

    useEffect(() => {
        const get = async () => {
            dispatch(setLoading(true));
            await getOrder();
            dispatch(setLoading(false));
        };
        get();

        return () => {dispatch(cleanState())}
    }, []);

    const [show, setShow] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [ listOrder, setListOrder ] = useState([
        {
            id: 1,
            value: 'id',
            state: false
        },
        {
            id: 2,
            value: '-id',
            state: true
        },
        {
            id: 3,
            value: 'factory',
            state: false
        },
        {
            id: 4,
            value: '-factory',
            state: false
        },
        {
            id: 5,
            value: 'status',
            state: false
        },
        {
            id: 6,
            value: '-status',
            state: false
        },
    ]);

    const [cookies, _, __] = useCookies<string>(["user"]);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.user);
    const { setLoading } = generalSlice.actions;
    const { listProductFactory, newOrder, listOrderAdmin, listOrderUser, listChkBx, listDropdown, 
        listSlct, listFile, listDateOrder, listDateShipping, listDateFactory, allChkBx, searchId, factorySlct } = useAppSelector(state => state.order);
    const { setListProductFactory, setListOrderAdmin, setListChkBx, detailSetListChkBx, setListDropdown, 
        setStateDropdown, setListSlct, detailSetListSlct, setListFile, setListDateOrder, detailSetListDateOrder, 
        setListDateShipping, detailSetListDateShipping, setListDateFactory, detailSetListDateFactory, allSetListChkBx, 
        setListOrderUser, cleanState, setSearch, setSlct } = orderSlice.actions;

    async function getOrder (
        page: number | undefined = 1,
        filter: {id?: string | undefined, factory?: string | null, ordering?: string | undefined} = {id: null, factory: null, ordering: '-id'}
    ) {
        const responseOrder = await getOrderApi(cookies.token, page, filter);

        if (responseOrder.status === 200 && user.is_superuser) {
            const responsePF = await getFactoryProductApi(cookies.token);

            if (responsePF.status === 200) {
                dispatch(setListProductFactory(responsePF.data));
                dispatch(setListOrderAdmin(responseOrder.data.results));
                dispatch(setListChkBx(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    state: false,
                    setState: () => dispatch(detailSetListChkBx(item.id))
                }))));
                dispatch(setListDropdown(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    count: 2,
                    list: item.quantity_product.map((qp: any) => `${qp.product} (${qp.quantity})`),
                    state: false,
                    setState: () => dispatch(setStateDropdown(item.id))
                }))));
                dispatch(setListSlct(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    data: item.status.choice,
                    state: item.status.current,
                    setState: (value: any) => dispatch(detailSetListSlct({id: item.id, value: value}))
                }))));
                dispatch(setListFile(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    text: 'Скачать',
                    data: item.xml,
                }))));
                dispatch(setListDateOrder(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    type: 'datetime-local',
                    text: reconstructDateTime(item.receiving_order, '[-T:.]+', [2, '.', 1, '.', 0, ' ', 3, ':', 4, ':', 5]),
                    value: reconstructDateTime(item.receiving_order, '[.]+', [0]),
                    state: false,
                    setState: () => dispatch(detailSetListDateOrder(item.id))
                }))));
                dispatch(setListDateShipping(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    type: 'datetime-local',
                    text: reconstructDateTime(item.shipping_date, '[-T:.]+', [2, '.', 1, '.', 0, ' ', 3, ':', 4, ':', 5]),
                    value: reconstructDateTime(item.shipping_date, '[.]+', [0]),
                    state: false,
                    setState: () => dispatch(detailSetListDateShipping(item.id))
                }))));
                dispatch(setListDateFactory(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    type: 'datetime-local',
                    text: reconstructDateTime(item.accepted_factory, '[-T:.]+', [2, '.', 1, '.', 0, ' ', 3, ':', 4, ':', 5]),
                    value: reconstructDateTime(item.accepted_factory, '[.]+', [0]),
                    state: false,
                    setState: () => dispatch(detailSetListDateFactory(item.id))
                }))));
                dispatch(setSlct({select: 'factory', list: responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    name: item.factory
                }))}));
                setPageCount(responseOrder.data.count_page);
                setCurrentPage(page);
            }
            else {
                console.log(responsePF)
            }
        }
        else if (responseOrder.status === 200 && !user.is_superuser) {
            const responsePF = await getFactoryProductApi(cookies.token);

            if (responsePF.status === 200) {
                dispatch(setListProductFactory(responsePF.data));
                dispatch(setListOrderUser(responseOrder.data.results.map((item: any) => {
                    item.creator_at = reconstructDateTime(item.creator_at, '[-T:.]+', [2, '.', 1, '.', 0, ' ', 3, ':', 4, ':', 5]);
                    item.last_update = reconstructDateTime(item.last_update, '[-T:.]+', [2, '.', 1, '.', 0, ' ', 3, ':', 4, ':', 5]);
                    return item
                })));
                dispatch(setListChkBx(responseOrder.data.results.map((item: any) => ({
                    id: item.id,
                    state: false,
                    setState: () => dispatch(detailSetListChkBx(item.id))
                }))));
                setPageCount(responseOrder.data.count_page);
                setCurrentPage(page);
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
            xml: newOrder.xml.file,
            factory: newOrder.factory
        });

        if (responseOrder.status === 200) {
            const responseQP = await addQuantityProductApi(cookies.token, {
                order: responseOrder.data.id,
                quantityProduct: newOrder.quantityProduct,
            });


            if (responseQP.status === 200) {
                await getOrder(currentPage);
                setListOrder(listOrder);
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

    async function delOrder () {
        const delFactory = getNestingFromObj(listChkBx, true, 'id');
        const response = await delOrderApi(cookies.token, delFactory);

        if (response.status === 200) {
            await getOrder();
        }
        else {
            console.log(response);
        }
    };

    function getCurrentFilter (id?: string | undefined, factory?: number | undefined, ordering?: {id: number, value: string, state: boolean}[] | undefined) {
        return {
            id: id ? id : null,
            // customer: factorySlct.list.find(item => item.id === name) ? factorySlct.list.find(item => item.id === name).name : null,
            factory: factorySlct.list.find(item => item.id === factory) ? factorySlct.list.find(item => item.id === factory).name : null,
            // status: factorySlct.list.find(item => item.id === name) ? factorySlct.list.find(item => item.id === name).name : null,
            ordering: ordering.find(item => item.state).value
        }
    };

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
                                actionOne: () => setShow(true),
                                textOne: 'Добавить заказ'
                            }}
                            two={{
                                textTwo: 'Удалить',
                                actionTwo: () => delOrder(),
                                clsStyleTwo: listChkBx.some(item => item.state === true) ? 'red' : undefined
                            }}
                        />
                    </div>
                    <div className={classes.content__body}>
                        <Tbl 
                            data={{
                                head: [
                                    {
                                        list: user.is_superuser ? [
                                            <ChckBx id={0} state={allChkBx} setState={() => dispatch(allSetListChkBx())}/>,
                                            <Filter text={'ID'} click={async () => {
                                                const ordering = currentOrdering(listOrder, 1, 2);
                                                setListOrder(ordering);
                                                await getOrder(1, {...getCurrentFilter(searchId.value, factorySlct.current, ordering)});
                                            }}/>,
                                            'Заказчик', 
                                            <Filter text={'Фабрика'} click={async () => {
                                                const ordering = currentOrdering(listOrder, 3, 4);
                                                setListOrder(ordering);
                                                await getOrder(1, {...getCurrentFilter(searchId.value, factorySlct.current, ordering)});
                                            }}/>,
                                            <Filter text={'Статус'} click={async () => {
                                                const ordering = currentOrdering(listOrder, 5, 6);
                                                setListOrder(ordering);
                                                await getOrder(1, {...getCurrentFilter(searchId.value, factorySlct.current, ordering)});
                                            }}/>,
                                            'Получ. заказа',
                                            'Дата отгрузки',
                                            'Получ. фабр.',
                                            'XML',
                                            'Продукция (шт.)',
                                        ] :
                                        [
                                            <ChckBx id={0} state={allChkBx} setState={() => dispatch(allSetListChkBx())}/>,
                                            <Filter text={'ID'} click={() => {}}/>,
                                            <Filter text={'Заказчик'} click={() => {}}/>, 
                                            <Filter text={'Фабрика'} click={() => {}}/>,
                                            <Filter text={'Статус'} click={() => {}}/>,
                                            'Время загрузки',
                                            'Последнее обновление',
                                            'Имя компании',
                                        ]
                                    },
                                ],
                                filter: {
                                    list: user.is_superuser ? [
                                        '', 
                                        Search({
                                            show: searchId.show, 
                                            value: searchId.value, 
                                            setShow: () => dispatch(setSearch({value: undefined})),
                                            setValue: (value: string) => dispatch(setSearch({value: value})),
                                            clickEnter: async () => {
                                                await getOrder(1, {...getCurrentFilter(searchId.value, -1, listOrder)});
                                            }
                                        }),
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
                                            data={factorySlct.list}
                                            state={factorySlct.current}
                                            setState={async (value: number) => {
                                                dispatch(setSlct({select: 'factory', current: value}));
                                                await getOrder(1, {...getCurrentFilter(searchId.value, value, listOrder)});
                                            }}
                                            defaultOpt={{disabled: false, selected: false, value: -1, text: 'Все'}}
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
                                        '', '', '', '', ''
                                    ] : [
                                        '', 
                                        // <Search />, 
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
                                        // '', '', <Search />,
                                    ]
                                },
                                body: user.is_superuser ? constructTbl(listOrderAdmin, [
                                    {index: 0, step: 0, elem: ChckBx, props: listChkBx},
                                    {index: 9, step: 0, elem: DropdownList, props: listDropdown},
                                    {index: 10, step: 1},
                                    {index: 4, step: 0, elem: Slct, props: listSlct},
                                    {index: 5, step: 1},
                                    {index: 8, step: 0, elem: Download, props: listFile},
                                    {index: 9, step: 1},
                                    {index: 5, step: 0, elem: EditDataInpt, props: listDateOrder},
                                    {index: 6, step: 1},
                                    {index: 6, step: 0, elem: EditDataInpt, props: listDateShipping},
                                    {index: 7, step: 1},
                                    {index: 7, step: 0, elem: EditDataInpt, props: listDateFactory},
                                    {index: 8, step: 1},
                                ]) : constructTbl(listOrderUser, [{index: 0, step: 0, elem: ChckBx, props: listChkBx}])
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
                                <span className={classes.content__footer__wrapper__number__text}>Найдено заказов: {listOrderAdmin.length}</span>
                            </div>
                            <div className={classes.content__footer__wrapper__pagination}>
                                <Pagination count={pageCount} currentPage={currentPage} api={(page: number | undefined = 1) => getOrder(page, {...getCurrentFilter(searchId.value, factorySlct.current, listOrder)})}/>
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