
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import classes from "../../accets/styles/pages/menu/product.module.scss";
import classNames from "classnames";
import Tbl from "../../components/UI/Tbl";
import ChckBx from "../../components/UI/ChckBx";
import Pagination from "../../components/Pagination";
import { textAlign, sizeModal } from "../../services/typing/typeVar/styles";
import HeaderBtn from "../../components/HeaderBtn";
import Mdl from "../../components/UI/Mdl";
import { getProductApi, delProductApi, addProductApi, updateProductApi } from "../../services/api/product.api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { productSlice } from "../../services/store/reducers/product.dux";
import { constructTbl } from "../../services/hooks/other";
import { getNestingFromObj } from "../../services/hooks/other";
import { generalSlice } from "../../services/store/reducers/general.dux";
import ProductMdl from "../../components/BodyMdl/ProductMdl";
import { faTrashCan, faPlus, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slct from "../../components/UI/Slct";


const Product = () => {

    useEffect(() => {
        const get = async () => {
            dispatch(setLoading(true));
            await getProduct();
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
    const { listProduct, listChkBx, allChkBx, newProduct, listStatusSlct } = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const { setListProduct, setListChkBx, detailSetListChkBx, allSetListChkBx, cleanState, cleanNewProduct, setListStatusSlct, detailSetListStatusSlct } = productSlice.actions

    async function getProduct (page: number | undefined = 1) {
        const response = await getProductApi(cookies.token, page);

        if (response.status === 200) {
            dispatch(setListProduct(response.data.results));
            dispatch(setListChkBx(response.data.results.map((item: any) => ({
                id: item.id,
                state: false,
                setState: () => dispatch(detailSetListChkBx(item.id))
            }))));
            dispatch(setListStatusSlct(response.data.results.map((item: any) => ({
                id: item.id,
                data: [
                    {id: 1, name: 'Доступно', other: true},
                    {id: 2, name: 'Закончилось', other: false}
                ],
                state: item.status ? 1 : 2,
                setState: (value: any) => updateProduct(item.id, value)
            }))));
            setPageCount(response.data.count_page);
            setCurrentPage(page);
        }
        else {
            console.log(response);
        }
    };

    async function updateProduct (id: number, value: number) {
        const response = await await updateProductApi(cookies.token, id, {status: value === 1 ? true : false});

        if (response.status === 200) {
            dispatch(detailSetListStatusSlct({id: id, value: value}));;
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Изменено',
                extraText: `Статус продукта изменен`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
        else {
            dispatch(cleanNewProduct());
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка',
                extraText: `Не удалось изменить статус`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        };
    };

    async function addProduct () {
        dispatch(setLoading(true));
        const response = await addProductApi(cookies.token, newProduct);

        if (response.status === 201) {
            dispatch(cleanNewProduct());
            await getProduct();
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Добавлено',
                extraText: `Продукт успешно добавлен`,
                totalStyle: 'access',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        }
        else {
            dispatch(cleanNewProduct());
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Ошибка',
                extraText: `Не удалось добавить продукт`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        };
        dispatch(setLoading(false));
    };

    async function delProduct () {
        dispatch(setLoading(true));
        const delFactory = getNestingFromObj(listChkBx, true, 'id');
        const response = await delProductApi(cookies.token, delFactory);

        if (response.status === 200) {
            await getProduct();
            dispatch(setCurrentNotification({
                type: 'fixed',
                mainText: 'Удалено',
                extraText: `Продукт успешно удален`,
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
                extraText: `Не удалось удалить продукт`,
                totalStyle: 'reject',
                lvl: 'lvl1',
                close: true
            }));
            setTimeout(() => dispatch(setCurrentNotification(false)), 5100);
        };
        dispatch(setLoading(false));
    };

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <Mdl 
                        show={show} 
                        setShow={setShow} 
                        sizeModal={sizeModal.Small}
                        title={'Новый продукт'}
                        Body={ProductMdl}
                        btnLeft={{
                            action: () => {
                                setShow(false);
                                dispatch(cleanNewProduct());
                            },
                            text: 'Отмена'
                        }}
                        btnRight={{
                            action: async () => {
                                setShow(false);
                                await addProduct();
                            },
                            text: 'Создать',
                        }}
                        bodyH='45vh'
                        bodyW='24vh'

                    />
                    <div className={classes.content__header}>
                        <HeaderBtn 
                            data={[
                                {
                                    text: 'Добавить продукт',
                                    after: <FontAwesomeIcon icon={faPlus} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>,
                                    action: () => setShow(true),
                                },
                                // {
                                //     text: 'Изменить наличие',
                                //     after: <FontAwesomeIcon icon={faPenToSquare} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>,
                                //     action: () => {},
                                //     clsStyle: listChkBx.some(item => item.state === true) ? 'default' : 'inactive'
                                // },
                                {
                                    text: 'Удалить',
                                    after: <FontAwesomeIcon icon={faTrashCan} style={{marginLeft: "10px", fontSize: '1.7vh'}}/>,
                                    action: () => listChkBx.some(item => item.state === true) ? delProduct() : {},
                                    clsStyle: listChkBx.some(item => item.state === true) ? 'red' : 'inactive'
                                }
                            ]}
                        />
                    </div>
                    <div className={classes.content__body}>
                        <Tbl
                            data={{
                                head: [
                                    {
                                        list: [
                                            <ChckBx id={0} state={allChkBx} setState={() => dispatch(allSetListChkBx())}/>,
                                            'Артикул',
                                            'Название продукта', 
                                            'Размер (мм)',
                                            'Наличие продукта'
                                        ]
                                    },
                                ],
                                body: constructTbl(listProduct, [
                                    {index: 0, step: 0, elem: ChckBx, props: listChkBx},
                                    {index: 1, step: 1},
                                    {index: 4, step: 0, elem: Slct, props: listStatusSlct},
                                    {index: 5, step: 1}
                                ])
                            }}
                            totalStyle={{
                                striped: false,
                                bordered: false,
                            }}
                            headStyle={{
                                headHorizontallyAlign: textAlign.Center
                            }}
                            bodyStyle={{
                                bodyHorizontallyAlign: textAlign.Center
                            }}
                        />
                    </div>
                    <div className={classes.content__footer}>
                        <div className={classes.content__footer__wrapper}>
                            <div className={classes.content__footer__wrapper__number}>
                                <span className={classes.content__footer__wrapper__number__text}>Найдено продуктов: {listProduct.length}</span>
                            </div>
                            <div className={classes.content__footer__wrapper__pagination}>
                                <Pagination count={pageCount} currentPage={currentPage} api={(page: number | undefined = 1) => getProduct(page)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product