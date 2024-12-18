
import { useState } from "react";
import classes from "../../accets/styles/components/BodyMdl/orderMdl.module.scss";
import classNames from 'classnames';
import { PropsOrderMdl } from "../../services/typing/interfaces/components/BodyMdl/orderMdl.interfaces";
import { range } from "../../services/hooks/other";
import File from "../UI/File";
import Slct from "../UI/Slct";
import Inpt from "../UI/Inpt";
import { useAppSelector, useAppDispatch } from "../../services/hooks/redux";
import { orderSlice } from "../../services/store/reducers/order.dux";
import { getContentFile, strToBinary } from "../../services/hooks/other";


const OrderMdl:React.FC<PropsOrderMdl> = () => {

    const [state, setState] = useState(1);
    const dispatch = useAppDispatch();
    const { listProductFactory, newOrder } = useAppSelector(state => state.order);
    const { setNewOrderFactory, setNewOrderProduct, setNewOrderQuantity, addQuantityProduct, setNewOrderXML } = orderSlice.actions;

    return (
        <div className={classes.main}>
            <div className={classNames(classes.main__file, newOrder.xml.file ? classes.main__fileAdd : '')}>
                <File value={newOrder.xml} setValue={async (e: any) => {
                        const file: any = await getContentFile(e);
                        const name: string = e.target.files[0].name;
                        const size: number = e.target.files[0].size;
                        dispatch(setNewOrderXML({
                            file: file,
                            name: name,
                            size: size
                        }))}
                    }
                    delValue={() => dispatch(setNewOrderXML({
                        file: undefined,
                        name: undefined,
                        size: undefined
                    }))}
                />
            </div>
            <div className={classNames(classes.main__body, newOrder.xml.file ? classes.main__bodyAdd : '')}>
                <div className={classes.main__body__list}>
                    <div className={classes.main__body__list__factory}>
                        <Slct 
                            data={listProductFactory.factory}
                            state={newOrder.factory}
                            setState={(value: number) => dispatch(setNewOrderFactory(value))}
                            label={'Выберите фабрику'}
                            mainStyle={{height: '5vh'}}
                            defaultOpt={{disabled: false, selected: false, value: -1, text: 'Ничего не выбрано'}}
                        />
                    </div>
                    
                    {range(state).map(item => 
                        <div className={classes.main__body__list__product}>
                            <Slct 
                                data={listProductFactory.product}
                                state={newOrder.quantityProduct[item].product}
                                setState={(value: number) => dispatch(setNewOrderProduct({index: item, product: value}))}
                                
                                label={`Выберите продукт ${item + 1}`}
                                mainStyle={{height: '5vh'}}
                                defaultOpt={{disabled: false, selected: false, value: -1, text: 'Ничего не выбрано'}}
                            />
                            <Inpt 
                                type={'number'} 
                                name={`Количесво продукции ${item + 1}`}  
                                mainStyle={{height: '5vh'}} 
                                nameStyle={{color: '#696784'}}
                                placeholder={'Введите число'}
                                value={newOrder.quantityProduct[item].quantity}
                                setValue={(value: number) => dispatch(setNewOrderQuantity({index: item, quantity: value}))}
                            /> 
                        </div>
                    )}
                </div>
                <div className={classes.main__body__add}>
                    <span className={classes.main__body__add__text} onClick={() => {
                        dispatch(addQuantityProduct({id: state + 1, product: undefined, quantity: undefined}));
                        setState(state + 1);
                    }}>Добавить продукцию</span>
                </div>
            </div>
        </div>
    )
}

export default OrderMdl