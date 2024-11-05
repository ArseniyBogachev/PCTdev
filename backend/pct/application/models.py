from django.db import models


class Factory(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField()
    fio = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=100)
    company = models.CharField(max_length=100, null=True)
    phone_company = models.CharField(max_length=100, null=True)
    owner = models.ForeignKey('authentification.User', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Product(models.Model):
    article_number = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=100)


class Order(models.Model):
    STATUS_ORDER = {
        'ABF': 'Принято фабрикой',
        'ABC': 'Добавлено заказчиком',
        'HIR': 'Принято в работу',
        'OHS': 'Заказ отгружен',
        'COM': 'Завершен'
    }

    customer = models.ForeignKey('authentification.User', null=True, on_delete=models.CASCADE)
    factory = models.ForeignKey('Factory', null=True, on_delete=models.CASCADE)
    status = models.CharField(max_length=100, choices=STATUS_ORDER, default='ABC')
    receiving_order = models.DateTimeField(auto_now_add=True)
    shipping_date = models.DateTimeField(auto_now_add=True)
    accepted_factory = models.DateTimeField(auto_now_add=True)
    xml = models.BinaryField(max_length=10000, null=True)
    quantity_product = models.ManyToManyField('Product', through='QuantityProduct', related_name='qp')
    creator_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    company = models.CharField(max_length=100, null=True)


class QuantityProduct(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    