
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import classes from "../../accets/styles/pages/menu/factory.module.scss";
import classNames from 'classnames';
import Tbl from "../../components/UI/Tbl";
import Slct from "../../components/UI/Slct";
import ChckBx from "../../components/UI/ChckBx";
import Search from "../../components/UI/Search";
import Pagination from "../../components/Pagination";
import Filter from "../../components/UI/Filter";
import { textAlign, sizeModal } from "../../services/typing/typeVar/styles";
import HeaderBtn from "../../components/HeaderBtn";
import Mdl from "../../components/UI/Mdl";
import FactodyMdl from "../../components/BodyMdl/FactoryMdl";
import { addFactoryApi, getFactoryApi, delFactoryApi, getFactoryFilterApi } from "../../services/api/factory.api";
import { useAppSelector, useAppDispatch } from "../../services/hooks/redux";
import { factorySlice } from "../../services/store/reducers/factory.dux";
import { generalSlice } from "../../services/store/reducers/general.dux";
import { constructTbl, getNestingFromObj } from "../../services/hooks/other";
import { currentOrdering } from "../../services/hooks/other";


const Factory = () => {

    useEffect(() => {
        const get = async () => {
            dispatch(setLoading(true));
            await getFactory();
            dispatch(setLoading(false));
        };
        get();

        return () => {
            dispatch(cleanState());
        };
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
        }
    ]);

    const { newFactory, listFactory, listChkBx, allChkBx, searchId, searchPhone, factorySlct } = useAppSelector(state => state.factory);
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const { setListFactory, cleanItemFactory, setListChkBx, detailSetListChkBx, allSetListChkBx, cleanState, setSearch, setFactorySlct, setValidateNewFactory } = factorySlice.actions
    const { setLoading, setCurrentNotification } = generalSlice.actions;
    const navigate = useNavigate();
    const [cookies, _, __] = useCookies<string>(["user"]);

    async function getFactory (
            page: number | undefined = 1, 
            filter: {id?: string | null, name?: string | null, phone?: string | null, ordering?: string} = {id: null, name: null, phone: null, ordering: '-id'},
    ) {
        const response = await getFactoryApi(cookies.token, page, filter);

        if (response.status === 200) {
            const responseFilterName = await getFactoryFilterApi(cookies.token);
            console.log(responseFilterName)

            if (responseFilterName.status === 200) {
                dispatch(setListFactory(response.data.results));
                dispatch(setListChkBx(response.data.results.map((item: any) => ({
                    id: item.id,
                    state: false,
                    setState: () => dispatch(detailSetListChkBx(item.id))
                }))));
                dispatch(setFactorySlct({list: responseFilterName.data.map((item: {name: string}, index: number) => ({
                    id: index,
                    name: item.name
                }))}));
                setPageCount(response.data.count_page);
                setCurrentPage(page);
            }
        }
        else {
            console.log(response);
        }
    };

    async function addFactory () {
        const response = await addFactoryApi(cookies.token, {...newFactory, owner: user.id});

        if (response.status === 201) {
            await getFactory(currentPage);
            setListOrder(listOrder);
            setShow(false);
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Добавлено',
                extraText: `Фабрика ${newFactory.name} добавлена`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
            dispatch(cleanItemFactory());
        }
        else {
            dispatch(setValidateNewFactory());
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка',
                extraText: `Не удалось добавить фабрику`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
    };

    async function delFactory () {
        const delFactory = getNestingFromObj(listChkBx, true, 'id');
        const response = await delFactoryApi(cookies.token, delFactory);

        if (response.status === 200) {
            await getFactory();
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Удалена',
                extraText: `Фабрика ${newFactory.name} удалена`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
        else {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка',
                extraText: `Не удалось удалить фабрику`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
    };

    function getCurrentFilter (id?: string | undefined, name?: number | undefined, phone?: string | undefined, ordering?: {id: number, value: string, state: boolean}[] | undefined) {
        return {
            id: id ? id : null, 
            name: factorySlct.list.find(item => item.id === name) ? factorySlct.list.find(item => item.id === name).name : null,
            phone: phone ? phone : null,
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
                        sizeModal={sizeModal.Small}
                        title={'Новая фабрика'}
                        Body={FactodyMdl}
                        btnLeft={{
                            action: () => {
                                setShow(false);
                                dispatch(cleanItemFactory());
                            },
                            text: 'Отмена'
                        }}
                        btnRight={{
                            action: () => addFactory(),
                            text: 'Применить'
                        }}
                        bodyH='65vh'
                        bodyW='25vh'
                    />
                    <div className={classes.content__header}>
                        <HeaderBtn 
                            one={{
                                actionOne: () => setShow(true),
                                textOne: 'Добавить фабрику'
                            }}
                            two={{
                                textTwo: 'Удалить',
                                actionTwo: () => listChkBx.some(item => item.state === true) ? delFactory() : {},
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
                                                await getFactory(1, {...getCurrentFilter(searchId.value, factorySlct.current, searchPhone.value, ordering)});
                                            }}/>, 
                                            'Название фабрики',
                                            'Телефон',
                                            'Email',
                                            'ФИО',
                                            'Регстр. номер',
                                            'Компания',
                                            'Телефон копании'
                                        ] : [
                                            <ChckBx id={0} state={allChkBx} setState={() => dispatch(allSetListChkBx())}/>,
                                            <Filter text={'ID'} click={async () => {
                                                const ordering = currentOrdering(listOrder, 1, 2);
                                                setListOrder(ordering);
                                                await getFactory(1, {...getCurrentFilter(searchId.value, factorySlct.current, searchPhone.value, ordering)});
                                            }}/>,  
                                            'Название фабрики',
                                            'Телефон',
                                            'Email',
                                            'ФИО',
                                            'Регстр. номер',
                                        ]
                                    },
                                ],
                                filter: {
                                    list: user.is_superuser ? [
                                        '', 
                                        Search({
                                            show: searchId.show, 
                                            value: searchId.value, 
                                            setShow: () => dispatch(setSearch({search: 'id', value: undefined})),
                                            setValue: (value: string) => dispatch(setSearch({search: 'id', value: value})),
                                            clickEnter: async () => {
                                                dispatch(setFactorySlct({current: -1}));
                                                await getFactory(1, {...getCurrentFilter(searchId.value, -1, searchPhone.value, listOrder)});
                                            }
                                        }),
                                        <Slct 
                                            data={factorySlct.list}
                                            state={factorySlct.current}
                                            setState={async (value: number) => {
                                                dispatch(setFactorySlct({current: value}));
                                                await getFactory(1, {...getCurrentFilter(searchId.value, value, searchPhone.value, listOrder)});
                                            }}
                                            defaultOpt={{disabled: false, selected: false, value: -1, text: 'Все'}}
                                        />,
                                        Search({
                                            show: searchPhone.show, 
                                            value: searchPhone.value, 
                                            setShow: () => dispatch(setSearch({search: 'phone', value: undefined})),
                                            setValue: (value: string) => dispatch(setSearch({search: 'phone', value: value})),
                                            clickEnter: async () => {
                                                dispatch(setFactorySlct({current: -1}));
                                                await getFactory(1, {...getCurrentFilter(searchId.value, -1, searchPhone.value, listOrder)});
                                            }
                                        }),
                                        '', '', '', '', ''
                                    ] : [
                                        '', 
                                        Search({
                                            show: searchId.show, 
                                            value: searchId.value, 
                                            setShow: () => dispatch(setSearch({search: 'id', value: undefined})),
                                            setValue: (value: string) => dispatch(setSearch({search: 'id', value: value})),
                                            clickEnter: async () => {await getFactory(1, {...getCurrentFilter(searchId.value, -1, searchPhone.value, listOrder)})}
                                        }),
                                        <Slct 
                                            data={factorySlct.list}
                                            state={factorySlct.current}
                                            setState={async (value: number) => {
                                                dispatch(setFactorySlct({current: value}));
                                                await getFactory(1, {...getCurrentFilter(searchId.value, value, searchPhone.value, listOrder)});
                                            }}
                                            defaultOpt={{disabled: false, selected: false, value: -1, text: 'Все'}}
                                        />,
                                        Search({
                                            show: searchPhone.show, 
                                            value: searchPhone.value, 
                                            setShow: () => dispatch(setSearch({search: 'phone', value: undefined})),
                                            setValue: (value: string) => dispatch(setSearch({search: 'phone', value: value})),
                                            clickEnter: async () => {await getFactory(1, {...getCurrentFilter(searchId.value, -1, searchPhone.value, listOrder)})}
                                        }),
                                        '', '', ''
                                    ]
                                },
                                body: constructTbl(listFactory, [{index: 0, step: 0, elem: ChckBx, props: listChkBx}])
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
                                <span className={classes.content__footer__wrapper__number__text}>Найдено заказов: {listFactory.length}</span>
                            </div>
                            <div className={classes.content__footer__wrapper__pagination}>
                                <Pagination 
                                    count={pageCount} 
                                    currentPage={currentPage} 
                                    api={(page: number | undefined = 1) => getFactory(page, {...getCurrentFilter(searchId.value, factorySlct.current, searchPhone.value, listOrder)})}
                                    // currentGroup={}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Factory
