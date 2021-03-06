# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-31 07:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('description', models.TextField(blank=True, null=True)),
                ('date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('person', models.TextField(blank=True, null=True)),
                ('email', models.TextField(blank=True, null=True)),
                ('phone', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PersonEvent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notice', models.TextField(blank=True, null=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contactlist.Event')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contactlist.Person')),
            ],
        ),
    ]
