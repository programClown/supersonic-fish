from fastapi import APIRouter


from .apis import apis_router
from .auditlog import auditlog_router
from .base import base_router
from .users import users_router

v1_router = APIRouter()

v1_router.include_router(base_router, prefix="/base")
v1_router.include_router(users_router, prefix="/user")
v1_router.include_router(apis_router, prefix="/api")
v1_router.include_router(auditlog_router, prefix="/auditlog")
