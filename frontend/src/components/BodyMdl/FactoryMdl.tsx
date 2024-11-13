
import classes from "../../accets/styles/components/BodyMdl/factodyMdl.module.scss";
import classNames from "classnames";
import { PropsFactoryMdl } from "../../services/typing/interfaces/components/BodyMdl/factoryMdl.interfaces";
import Notification from "../UI/Notification";
import Inpt from "../UI/Inpt";
import { listBodyComponent } from "../../services/static_data/dataFactory";
import { useAppSelector, useAppDispatch } from "../../services/hooks/redux";
import { factorySlice } from "../../services/store/reducers/factory.dux";


const FactodyMdl:React.FC<PropsFactoryMdl> = () => {

    const { newFactory, validateNewFactory } = useAppSelector(state => state.factory);
    const dispatch = useAppDispatch()
    const { setItemFactory } = factorySlice.actions

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
                                nameCls={item.ui.nameStyle} 
                                mainStyle={item.ui.mainStyle} 
                                area={item.type === 'area'}
                                value={newFactory[item.name]}
                                setValue={(value: string) => dispatch(setItemFactory({name: item.name, value: value}))}
                                stateError={item.name !== 'registration_number' ? validateNewFactory[item.name] : false}
                                textError={'Необходимо заполнить поле'}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FactodyMdl