
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
import { getProductApi, delProductApi } from "../../services/api/product.api";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { productSlice } from "../../services/store/reducers/product.dux";
import { constructTbl } from "../../services/hooks/other";
import { getNestingFromObj } from "../../services/hooks/other";


const Product = () => {

    useEffect(() => {
        getProduct(currentPage);
        return () => {dispatch(cleanState())}
    }, []);

    const [show, setShow] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [cookies, _, __] = useCookies<string>(["user"]);
    const { listProduct, listChkBx, allChkBx } = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const { setListProduct, setListChkBx, detailSetListChkBx, allSetListChkBx, cleanState } = productSlice.actions

    async function getProduct (page: number | undefined = 1) {
        const response = await getProductApi(cookies.token, page);

        if (response.status === 200) {
            console.log(response);
            dispatch(setListProduct(response.data.results));
            dispatch(setListChkBx(response.data.results.map((item: any) => ({
                id: item.id,
                state: false,
                setState: () => dispatch(detailSetListChkBx(item.id))
            }))));
            setPageCount(response.data.count_page);
            setCurrentPage(page);
        }
        else {
            console.log(response);
        }
    };

    async function delProduct () {
        const delFactory = getNestingFromObj(listChkBx, true, 'id');
        const response = await delProductApi(cookies.token, delFactory);

        if (response.status === 200) {
            await getProduct();
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
                        title={'Новый продукт'}
                    /> */}
                    <div className={classes.content__header}>
                        <HeaderBtn 
                            one={{
                                textOne: 'Добавить продукт'
                            }}
                            two={{
                                textTwo: 'Удалить',
                                actionTwo: () => delProduct(),
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
                                            'Артикул',
                                            'Название продукта', 
                                            'Размер (мм)',
                                        ]
                                    },
                                ],
                                body: constructTbl(listProduct, [
                                    {index: 0, step: 0, elem: ChckBx, props: listChkBx},
                                    {index: 1, step: 1}
                                ])
                            }}
                            totalStyle={{
                                striped: false,
                                bordered: false,
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