# Generated by Django 5.0.3 on 2024-11-01 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0003_alter_customuser_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
