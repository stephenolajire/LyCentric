# Generated by Django 5.0.3 on 2024-10-18 09:20

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Store', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=200)),
                ('lastName', models.CharField(max_length=200)),
                ('phoneNumber', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('state', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('localGovernment', models.CharField(max_length=300)),
                ('nearestBusStop', models.CharField(max_length=500)),
                ('homeAddress', models.CharField(max_length=1000)),
                ('amount', models.FloatField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Store.cart')),
                ('items', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Store.cartitem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created'],
            },
        ),
    ]
