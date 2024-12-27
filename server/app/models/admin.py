from tortoise import fields

from .base import BaseModel, TimestampMixin
from .enums import MethodType


class User(BaseModel, TimestampMixin):
    username = fields.CharField(
        max_length=20, unique=True, description="用户名称", index=True
    )
    alias = fields.CharField(max_length=30, null=True, description="姓名", index=True)
    email = fields.CharField(
        max_length=255, unique=True, description="邮箱", index=True
    )
    phone = fields.CharField(max_length=20, null=True, description="电话", index=True)
    password = fields.CharField(max_length=128, null=True, description="密码")
    last_login = fields.DatetimeField(null=True, description="最后登录时间", index=True)

    class Meta:
        table = "user"


class Api(BaseModel, TimestampMixin):
    path = fields.CharField(max_length=100, description="API路径", index=True)
    method = fields.CharEnumField(MethodType, description="请求方法", index=True)
    summary = fields.CharField(max_length=500, description="请求简介", index=True)
    tags = fields.CharField(max_length=100, description="API标签", index=True)

    class Meta:
        table = "api"


class AuditLog(BaseModel, TimestampMixin):
    user_id = fields.IntField(description="用户ID", index=True)
    username = fields.CharField(
        max_length=64, default="", description="用户名称", index=True
    )
    module = fields.CharField(
        max_length=64, default="", description="功能模块", index=True
    )
    summary = fields.CharField(
        max_length=128, default="", description="请求描述", index=True
    )
    method = fields.CharField(
        max_length=10, default="", description="请求方法", index=True
    )
    path = fields.CharField(
        max_length=255, default="", description="请求路径", index=True
    )
    status = fields.IntField(default=-1, description="状态码", index=True)
    response_time = fields.IntField(
        default=0, description="响应时间(单位ms)", index=True
    )
