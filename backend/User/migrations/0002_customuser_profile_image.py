# Generated by Django 5.0.3 on 2024-11-01 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_image',
            field=models.FileField(default='../image.png', upload_to=''),
        ),
    ]