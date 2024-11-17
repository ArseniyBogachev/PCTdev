from django.db import models


class Factory(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField()
    fio = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=100, blank=True)
    company = models.CharField(max_length=100, null=True)
    phone_company = models.CharField(max_length=100, null=True)
    owner = models.ForeignKey('authentification.User', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Product(models.Model):
    article_number = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    size = models.CharField(max_length=100)
    status = models.BooleanField(default=True)


class Order(models.Model):
    STATUS_ORDER = {
        0: 'Принято фабрикой',
        1: 'Добавлено заказчиком',
        2: 'Принято в работу',
        3: 'Заказ отгружен',
        4: 'Завершен'
    }

    customer = models.ForeignKey('authentification.User', null=True, on_delete=models.CASCADE)
    factory = models.ForeignKey('Factory', null=True, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS_ORDER, default=1)
    receiving_order = models.DateTimeField(auto_now_add=True)
    shipping_date = models.DateTimeField(default=None, null=True)
    accepted_factory = models.DateTimeField(default=None, null=True)
    xml = models.BinaryField(max_length=10000, null=True)
    quantity_product = models.ManyToManyField('Product', through='QuantityProduct', related_name='qp')
    creator_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    company = models.CharField(max_length=100, null=True)


class QuantityProduct(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    