# Generated by Django 5.1.1 on 2024-11-01 22:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='factory',
            name='company',
        ),
        migrations.RemoveField(
            model_name='factory',
            name='details',
        ),
    ]
