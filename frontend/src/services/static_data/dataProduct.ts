
const listBodyComponent = [
    {
        name: 'article_number',
        type: 'input',
        info: 'Введите артикул', 
        ui: {type: 'text', nameCls: 'nameLeft', nameStyle: {width: '55%', textAlign: 'right'}, name: 'Артикул', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'name',
        type: 'input',
        info: 'Введите полное название продукта', 
        ui: {type: 'text', nameCls: 'nameLeft', nameStyle: {width: '55%', textAlign: 'right'}, name: 'Название продукта', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'size',
        type: 'input',
        info: 'Размер протукта (мм)', 
        ui: {type: 'text', nameCls: 'nameLeft', nameStyle: {width: '55%', textAlign: 'right'}, name: 'Размер (мм)', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    }
]

export {
    listBodyComponent
}