
import classes from "../../accets/styles/components/BodyMdl/productMdl.module.scss";
import classNames from "classnames";
import { PropsProductMdl } from "../../services/typing/interfaces/components/BodyMdl/productMdl.indefaces";
import Notification from "../UI/Notification";
import Inpt from "../UI/Inpt";
import { listBodyComponent } from "../../services/static_data/dataProduct";
import { useAppSelector, useAppDispatch } from "../../services/hooks/redux";
import { productSlice } from "../../services/store/reducers/product.dux";


const ProductMdl:React.FC<PropsProductMdl> = ({}) => {

    const { newProduct } = useAppSelector(state => state.product);
    const dispatch = useAppDispatch()
    const { setNewProduct } = productSlice.actions

    return (
        <div className={classes.main}>
            <div className={classes.main__header}>
                <Notification type={'block'} mainText={'Заполните все необходимые пункты'} close={false} totalStyle={'info'}/>
            </div>
            <div className={classes.main__body}>
                {listBodyComponent.map(item => 
                    <div className={classes.main__body__item} style={item.wrap.style}>
                        <div className={classes.main__body__item__info}>
                            <label className={classes.main__body__item__info__label}>{item.info}</label>
                        </div>
                        <div className={classes.main__body__item__ui}>
                            <Inpt 
                                type={item.ui.type} 
                                name={item.ui.name} 
                                nameCls={item.ui.nameCls} 
                                nameStyle={item.ui.nameStyle}
                                mainStyle={item.ui.mainStyle} 
                                area={item.type === 'area'}
                                value={newProduct[item.name]}
                                setValue={(value: string) => dispatch(setNewProduct({name: item.name, value: value}))}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductMdl