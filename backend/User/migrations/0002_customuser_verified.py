# Generated by Django 5.0.3 on 2024-10-21 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='verified',
            field=models.BooleanField(default=False),
        ),
    ]