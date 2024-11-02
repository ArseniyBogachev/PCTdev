
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


const User = () => {

    const [show, setShow] = useState(false);

    const [cookies, _, __] = useCookies<string>(["user"]);
    const { listUser, listChkBx, allChkBx } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const { setListUser, setListChkBx, detailSetListChkBx, allSetListChkBx } = userSlice.actions;

    async function getUsers () {
        const response = await getUsersApi(cookies.token);

        if (response.status === 200) {
            console.log(response.data)
            dispatch(setListUser(response.data));
            dispatch(setListChkBx(response.data.map((item: any) => ({
                id: item.id,
                state: false,
                setState: () => dispatch(detailSetListChkBx(item.id))
            }))));
        }
        else {
            console.log(response);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

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
                                body: constructTbl(listUser, [
                                    {index: 0, step: 0, elem: ChckBx, props: listChkBx},
                                    {index: 1, step: 1}
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

export default User