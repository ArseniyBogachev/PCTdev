
import classes from "../../accets/styles/components/BodyMdl/factodyMdl.module.scss";
import classNames from "classnames";
import { PropsFactoryMdl } from "../../services/typing/interfaces/components/BodyMdl/factoryMdl.interfaces";
import Notification from "../UI/Notification";
import Inpt from "../UI/Inpt";


const FactodyMdl:React.FC<PropsFactoryMdl> = () => {

    const listBodyComponent = [
        {
            type: 'input',
            info: 'Введите полное название фабрики', 
            ui: {type: 'text', nameStyle: 'nameLeft', name: 'Название', mainStyle: {width: '60%'}},
            wrap: {}
        },
        {
            type: 'input',
            info: 'Регистрационный номер компании (необязательно)', 
            ui: {type: 'text', nameStyle: 'nameLeft', name: 'Номер', mainStyle: {width: '60%'}},
            wrap: {}
        },
        {
            type: 'input',
            info: 'ФИО контактного лица (фабрики)', 
            ui: {type: 'text', nameStyle: 'nameLeft', name: 'ФИО', mainStyle: {width: '60%'}},
            wrap: {}
        },
        {
            type: 'input',
            info: 'Введите почту', 
            ui: {type: 'text', nameStyle: 'nameLeft', name: 'Email', mainStyle: {width: '60%'}},
            wrap: {}
        },
        {
            type: 'input',
            info: 'Введите номер телефона', 
            ui: {type: 'text', nameStyle: 'nameLeft', name: 'Телефон', mainStyle: {width: '60%'}},
            wrap: {}
        },
        {
            type: 'area',
            info: 'Введите номер телефона', 
            ui: {type: 'text', nameStyle: 'nameLeft', name: 'Телефон', mainStyle: {width: '60%'}},
            wrap: {style: {height: '25%'}}
        }
    ]

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
                            <Inpt type={item.ui.type} name={item.ui.name} nameStyle={item.ui.nameStyle} mainStyle={item.ui.mainStyle} area={item.type === 'area'}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FactodyMdl