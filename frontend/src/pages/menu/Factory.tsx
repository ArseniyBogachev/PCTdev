
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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
import { addFactoryApi, getFactoryApi, delFactoryApi } from "../../services/api/factory.api";
import { useAppSelector, useAppDispatch } from "../../services/hooks/redux";
import { factorySlice } from "../../services/store/reducers/factory.dux";
import { generalSlice } from "../../services/store/reducers/general.dux";
import { constructTbl, getNestingFromObj } from "../../services/hooks/other";


const Factory = () => {

    const [show, setShow] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [idSearch, setIdSearch] = useState('');

    const { newFactory, listFactory, listChkBx, allChkBx } = useAppSelector(state => state.factory);
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const { setListFactory, cleanItemFactory, setListChkBx, detailSetListChkBx, allSetListChkBx } = factorySlice.actions
    const { setLoading } = generalSlice.actions
    const [cookies, _, __] = useCookies<string>(["user"]);

    async function getFactory (page: number | undefined = 1) {
        const response = await getFactoryApi(cookies.token, page);

        if (response.status === 200) {
            dispatch(setListFactory(response.data.results));
            dispatch(setListChkBx(response.data.results.map((item: any) => ({
                id: item.id,
                state: false,
                setState: () => dispatch(detailSetListChkBx(item.id))
            }))));
            setPageCount(response.data.count_page);
            setCurrentPage(page)
        }
        else {
            console.log(response);
        }
    };

    async function addFactory () {
        setLoading(true);
        const response = await addFactoryApi(cookies.token, {...newFactory, owner: user.id});

        if (response.status === 201) {
            await getFactory();
            setShow(false);
            dispatch(cleanItemFactory());
        }
        else {
            console.log(response);
        }
        setLoading(false);
    };

    async function delFactory () {
        setLoading(true);
        const delFactory = getNestingFromObj(listChkBx, true, 'id');
        const response = await delFactoryApi(cookies.token, delFactory);

        if (response.status === 200) {
            await getFactory();
        }
        else {
            console.log(response);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getFactory();
        setLoading(false);
    }, []);

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
                            action: () => addFactory(),
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
                            two={{
                                textTwo: 'Удалить',
                                actionTwo: () => delFactory(),
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
                                            'ID', 
                                            'Название фабрики',
                                            'Телефон',
                                            'Email',
                                            'ФИО',
                                            'Регстр. номер',
                                            'Компания',
                                            'Телефон копании'
                                        ] : [
                                            <ChckBx id={0} state={allChkBx} setState={() => dispatch(allSetListChkBx())}/>,
                                            'ID', 
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
                                        '', '', '', '', ''
                                    ] : [
                                        '', 
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
                                <Pagination count={pageCount} currentPage={currentPage} api={(page: number | undefined = 1) => getFactory(page)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Factory