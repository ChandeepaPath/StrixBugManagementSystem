# Generated by Django 3.1.2 on 2020-11-05 07:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Strix', '0009_auto_20201105_1305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='createdby',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]