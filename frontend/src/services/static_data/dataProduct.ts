
const listBodyComponent = [
    {
        name: 'article_number',
        type: 'input',
        info: 'Введите артикул', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'Артикул', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'name',
        type: 'input',
        info: 'Введите полное название продукта', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'Название продукта', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    },
    {
        name: 'size',
        type: 'input',
        info: 'Размер протукта (мм)', 
        ui: {type: 'text', nameStyle: 'nameLeft', name: 'Размер (мм)', mainStyle: {width: '60%'}},
        wrap: {style: {}}
    }
]

export {
    listBodyComponent
}