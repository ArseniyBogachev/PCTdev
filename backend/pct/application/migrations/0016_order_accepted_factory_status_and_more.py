# Generated by Django 5.1.1 on 2024-11-13 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0015_alter_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='accepted_factory_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_date_status',
            field=models.BooleanField(default=False),
        ),
    ]
