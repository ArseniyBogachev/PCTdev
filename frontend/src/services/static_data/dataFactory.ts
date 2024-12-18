
const listBodyComponent = [
    {
        name: 'name',
        type: 'input',
        info: 'Введите полное название фабрики', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'Название', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'registration_number',
        type: 'input',
        info: 'Регистрационный номер компании (необязательно)', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'Номер', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'fio',
        type: 'input',
        info: 'ФИО контактного лица (фабрики)', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'ФИО', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'email',
        type: 'input',
        info: 'Введите почту', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'Email', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'phone',
        type: 'input',
        info: 'Введите номер телефона', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'Телефон', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    // {
    //     name: 'phone',
    //     type: 'area',
    //     info: 'Введите номер телефона', 
    //     ui: {type: 'text', nameStyle: 'nameLeft', name: 'Реквизиты', mainStyle: {width: '60%'}},
    //     wrap: {style: {height: 'auto'}}
    // }
]

export {
    listBodyComponent
}