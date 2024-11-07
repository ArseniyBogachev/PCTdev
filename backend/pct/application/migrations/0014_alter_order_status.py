# Generated by Django 5.1.1 on 2024-11-05 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0013_alter_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[(0, 'Принято фабрикой'), (1, 'Добавлено заказчиком'), (2, 'Принято в работу'), (3, 'Заказ отгружен'), (4, 'Завершен')], default=1, max_length=100),
        ),
    ]