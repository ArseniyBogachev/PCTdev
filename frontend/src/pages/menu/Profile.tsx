
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../../accets/styles/pages/menu/profile.module.scss";
import Inpt from "../../components/UI/Inpt";
import HeaderBtn from "../../components/HeaderBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../../services/hooks/redux";
import { userSlice } from "../../services/store/reducers/user.dux";
import { updateMeApi } from "../../services/api/auth.api";
import { generalSlice } from "../../services/store/reducers/general.dux";
import { logoutApi } from "../../services/api/auth.api";


const Profile = () => {

    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const { write } = userSlice.actions;
    const [cookies, _, removeCookie] = useCookies<string>(["user"]);
    const navigate = useNavigate();
    const deepEqual = require('deep-equal');
    const { setLoading, setCurrentNotification } = generalSlice.actions

    const [disabled, setDisabled] = useState(true);
    const [phone, setPhone] = useState('');
    const [fio, setFio] = useState('');
    const [organization, setOrganization] = useState('');
    const [inn, setInn] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setPhone(user.phone);
        setFio(user.fio);
        setOrganization(user.organization);
        setInn(user.inn);
        setEmail(user.email);
    }, [])

    async function updateMe () {
        dispatch(setLoading(true));
        const response = await updateMeApi(cookies.token, {
            phone: phone,
            fio: fio,
            organization: organization,
            inn: inn
        });

        if (response.status === 200) {
            dispatch(write({...user, ...{phone: phone, fio: fio, organization: organization, inn: inn}}));
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Изменено',
                extraText: `Данные изменены`,
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
                extraText: `Не удалось изменить данные`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
        dispatch(setLoading(false));
    };

    async function logout () {
        dispatch(setLoading(true));
        const response = await logoutApi(cookies.token);

        if (response.status === 204) {
            removeCookie('token');
            dispatch(write(undefined));
            navigate('/login', { replace: true });
        }
        else {
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка',
                extraText: `Не удалось выйти из аккаунта`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
        dispatch(setLoading(false));
    };

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.content__header}>
                        <HeaderBtn 
                            one={{
                                actionOne: () => updateMe(),
                                textOne: 'Сохранить',
                                afterOne: <FontAwesomeIcon icon={faSave} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>,
                                clsStyleOne: deepEqual(
                                    {'phone': user.phone, 'fio': user.fio, 'organization': user.organization, 'inn': user.inn}, 
                                    {'phone': phone, 'fio': fio, 'organization': organization, 'inn': inn,}
                                ) ? 'inactive' : undefined
                            }}
                            two={{
                                textTwo: 'Выйти',
                                actionTwo: () => logout(),
                                afterTwo: <FontAwesomeIcon icon={faArrowRightFromBracket} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>,
                                clsStyleTwo: "red"
                            }}
                        />
                    </div>
                    <div className={classes.content__body}>
                        <div className={classes.content__body__list}>
                            <div className={classes.content__body__list__item}>
                                <Inpt name={'Телефон'} value={phone} setValue={setPhone}/>
                            </div>
                            <div className={classes.content__body__list__item}>
                                <Inpt name={'ФИО'} value={fio} setValue={setFio}/>
                            </div>
                            <div className={classes.content__body__list__item}>
                                <Inpt name={'Организация'} value={organization} setValue={setOrganization}/>
                            </div>
                            <div className={classes.content__body__list__item}>
                                <Inpt name={'ИНН'} value={inn} setValue={setInn}/>
                            </div>
                            <div className={classes.content__body__list__item}>
                                <Inpt name={'Почта'} disabled={disabled} value={email} setValue={setEmail}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile