# Generated by Django 5.1.1 on 2024-11-01 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Factory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('fio', models.CharField(max_length=100)),
                ('registration_number', models.CharField(max_length=100)),
                ('company', models.CharField(max_length=100)),
                ('details', models.JSONField()),
            ],
        ),
    ]
