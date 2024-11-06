
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


const User = () => {

    useEffect(() => {
        getUsers();

        return () => {dispatch(cleanState())}
    }, []);


    const [show, setShow] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [cookies, _, __] = useCookies<string>(["user"]);
    const { listUser, listChkBx, allChkBx, listFactory } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const { setListUser, setListChkBx, detailSetListChkBx, allSetListChkBx, setListFactory, detailSetListFactory, cleanState } = userSlice.actions;

    async function getUsers (page: number | undefined = 1) {
        const response = await getUsersApi(cookies.token);

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
                count: 1,
                state: false,
                setState: () => dispatch(detailSetListFactory(item.id))
            }))));
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
        }
        else {
            console.log(response);
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
                                actionTwo: () => delUsers(),
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
                                        '',
                                        '',
                                        '',
                                        // <Search />
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
                                <Pagination count={pageCount} currentPage={currentPage} api={(page: number | undefined = 1) => getUsers(page)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User