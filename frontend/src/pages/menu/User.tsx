
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
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
import { constructTbl } from "../../services/hooks/other";
import { getUsersApi } from "../../services/api/auth.api";
import { userSlice } from "../../services/store/reducers/user.dux";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { delUsersApi } from "../../services/api/auth.api";
import { getNestingFromObj } from "../../services/hooks/other";
import { generalSlice } from "../../services/store/reducers/general.dux";


const User = () => {

    useEffect(() => {
        const get = async () => {
            dispatch(setLoading(true));
            await getUsers();
            dispatch(setLoading(false));
        };
        get();

        return () => {dispatch(cleanState())}
    }, []);


    const [show, setShow] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [cookies, _, __] = useCookies<string>(["user"]);
    const { setLoading, setCurrentNotification } = generalSlice.actions
    const { listUser, listChkBx, allChkBx, listFactory, orgSlct, emailSlct, searchFactory } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const { setListUser, setListChkBx, detailSetListChkBx, allSetListChkBx, setListFactory, 
        detailSetListFactory, cleanState, setOrgSlct, setEmailSlct, setSearch } = userSlice.actions;

    async function getUsers (
        page: number | undefined = 1,
        filter: {organization?: string | null, email?: string | null, factory?: string | null} = {organization: null, email: null, factory: null},
    ) {
        const response = await getUsersApi(cookies.token, page, filter);

        if (response.status === 200) {
            dispatch(setListUser(response.data.results));
            dispatch(setListChkBx(response.data.results.map((item: any) => ({
                id: item.id,
                state: false,
                setState: () => dispatch(detailSetListChkBx(item.id))
            }))));
            dispatch(setListFactory(response.data.results.map((item: any) => ({
                id: item.id,
                list: item.factory.map((f: any) => f.name),
                count: 2,
                state: false,
                setState: () => dispatch(detailSetListFactory(item.id))
            }))));
            dispatch(setOrgSlct({list: response.data.results.map((item: any) => ({
                id: item.id,
                name: item.organization
            }))}));
            dispatch(setEmailSlct({list: response.data.results.map((item: any) => ({
                id: item.id,
                name: item.email
            }))}));
            setPageCount(response.data.count_page);
            setCurrentPage(page);
        }
        else {
            console.log(response);
        }
    };

    async function delUsers () {
        const delFactory = getNestingFromObj(listChkBx, true, 'id');
        const response = await delUsersApi(cookies.token, delFactory);

        if (response.status === 200) {
            await getUsers(currentPage);
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Удалено',
                extraText: `Пользователь успешно удален`,
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
                extraText: `Не удалось удалить пользователя`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
    };

    function getCurrentFilter (organization?: number | null, email?: number | null, factory?: string | null) {
        return {
            organization: orgSlct.list.find(item => item.id === organization) ? orgSlct.list.find(item => item.id === organization).name : null, 
            email: emailSlct.list.find(item => item.id === email) ? emailSlct.list.find(item => item.id === email).name : null,
            factory: factory ? factory : null
        }
    };

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
                            one={{
                                textOne: 'Добавить пользователя'
                            }} 
                            two={{
                                textTwo: 'Удалить',
                                actionTwo: () => listChkBx.some(item => item.state === true) ? delUsers() : {},
                                clsStyleTwo: listChkBx.some(item => item.state === true) ? 'red' : undefined
                            }}
                        />
                    </div>
                    <div className={classes.content__body}>
                        <Tbl 
                            data={{
                                head: [
                                    {
                                        list: [
                                            <ChckBx id={0} state={allChkBx} setState={() => dispatch(allSetListChkBx())}/>, 
                                            'Наименование организации', 
                                            'Логин/почта',
                                            'Телефон',
                                            'ФИО',
                                            'ИНН',
                                            'Фабрики',
                                        ]
                                    },
                                ],
                                filter: {
                                    list: [
                                        '',
                                        <Slct 
                                            data={orgSlct.list}
                                            state={orgSlct.current}
                                            setState={async (value: number) => {
                                                dispatch(setOrgSlct({current: value}));
                                                await getUsers(1, {...getCurrentFilter(value, emailSlct.current)});
                                            }}
                                            defaultOpt={{disabled: false, selected: false, value: -1, text: 'Все'}}
                                        />, 
                                        <Slct 
                                            data={emailSlct.list}
                                            state={emailSlct.current}
                                            setState={async (value: number) => {
                                                dispatch(setEmailSlct({current: value}));
                                                await getUsers(1, {...getCurrentFilter(orgSlct.current, value)});
                                            }}
                                            defaultOpt={{disabled: false, selected: false, value: -1, text: 'Все'}}
                                        />,
                                        '',
                                        '',
                                        '',
                                        '',
                                    ]
                                },
                                body: constructTbl(listUser, [
                                    {index: 0, step: 0, elem: ChckBx, props: listChkBx},
                                    {index: 1, step: 1},
                                    {index: 6, step: 0, elem: DropdownList, props: listFactory},
                                    {index: 7, step: 1},
                                ])
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
                                <span className={classes.content__footer__wrapper__number__text}>Найдено пользователей: {listUser.length}</span>
                            </div>
                            <div className={classes.content__footer__wrapper__pagination}>
                                <Pagination count={pageCount} currentPage={currentPage} api={(page: number | undefined = 1) => getUsers(page, {...getCurrentFilter(orgSlct.current, emailSlct.current)})}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User