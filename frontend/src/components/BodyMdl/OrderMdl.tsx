
import { useState } from "react";
import classes from "../../accets/styles/components/BodyMdl/orderMdl.module.scss";
import classNames from 'classnames';
import { PropsOrderMdl } from "../../services/typing/interfaces/components/BodyMdl/orderMdl.interfaces";
import { range } from "../../services/hooks/other";
import File from "../UI/File";
import Slct from "../UI/Slct";
import Inpt from "../UI/Inpt";


const OrderMdl:React.FC<PropsOrderMdl> = () => {

    const [state, setState] = useState(1);

    return (
        <div className={classes.main}>
            <div className={classes.main__file}>
                <File/>
            </div>
            <div className={classes.main__body}>
                <div className={classes.main__body__list}>
                    <div className={classes.main__body__list__factory}>
                        <Slct 
                            data={[
                                {id: 1, text: 'one'},
                                {id: 2, text: 'two'}
                            ]}
                            currentItem={1}
                            label={'Выберите фабрику'}
                            mainStyle={{height: '5vh'}}
                        />
                    </div>
                    
                    {range(state).map(item => 
                        <div className={classes.main__body__list__product}>
                            <Slct 
                                data={[
                                    {id: 1, text: 'one'},
                                    {id: 2, text: 'two'}
                                ]}
                                currentItem={1}
                                label={'Выберите продукт 1'}
                                mainStyle={{height: '5vh'}}
                            />
                            <Inpt 
                                type={'text'} 
                                name={'Количесво продукции 1'}  
                                mainStyle={{height: '5vh'}} 
                                nameStyle={{color: '#696784'}}
                                placeholder={'Введите число'}
                            /> 
                        </div>
                    )}
                </div>
                <div className={classes.main__body__add}>
                    <span className={classes.main__body__add__text} onClick={() => setState(state + 1)}>Добавить продукцию</span>
                </div>
            </div>
        </div>
    )
}

export default OrderMdl