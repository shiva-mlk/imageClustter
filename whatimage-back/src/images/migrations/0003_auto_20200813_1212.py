# Generated by Django 2.2 on 2020-08-13 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_auto_20200813_1152'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='uploaded',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
