# Generated by Django 3.2 on 2021-11-25 02:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.TextField(default='author', editable=False)),
                ('host', models.TextField()),
                ('url', models.TextField()),
                ('displayName', models.TextField()),
                ('github', models.TextField()),
                ('profileImage', models.URLField(default='https://i.imgur.com/7MUSXf9.png')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.TextField(default='comment', editable=False)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('contentType', models.TextField(default='text/markdown', editable=False)),
                ('comment', models.TextField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='newconnectionwhodis.author')),
            ],
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('host_uri', models.TextField(primary_key=True, serialize=False)),
                ('username', models.TextField()),
                ('password', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.TextField(default='post', editable=False)),
                ('source', models.URLField(editable=False)),
                ('origin', models.URLField(editable=False)),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('visibility', models.TextField(default='PUBLIC')),
                ('categories', models.JSONField()),
                ('unlisted', models.BooleanField(default=False)),
                ('contentType', models.TextField()),
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('content', models.TextField()),
                ('count', models.IntegerField(default=0)),
                ('comments', models.TextField(editable=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='newconnectionwhodis.author')),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('context', models.TextField(default='https://www.w3.org/ns/activitystreams', editable=False)),
                ('type', models.TextField(default='Like', editable=False)),
                ('author', models.JSONField()),
                ('comment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='newconnectionwhodis.comment')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='newconnectionwhodis.post')),
            ],
        ),
        migrations.CreateModel(
            name='Inbox',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.TextField(default='inbox', editable=False)),
                ('items', models.TextField(default='[]')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='newconnectionwhodis.author')),
            ],
        ),
        migrations.CreateModel(
            name='FollowReq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requestor', models.JSONField()),
                ('requestee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requestee', to='newconnectionwhodis.author')),
            ],
        ),
        migrations.CreateModel(
            name='Follower',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.JSONField()),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='newconnectionwhodis.author')),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='newconnectionwhodis.post'),
        ),
        migrations.AddConstraint(
            model_name='follower',
            constraint=models.UniqueConstraint(fields=('sender', 'receiver'), name='userFollowedUnique'),
        ),
    ]
