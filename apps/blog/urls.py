from rest_framework import routers
from .views import (
    CategoryViewSet,
    TagViewSet,
    PostViewSet,
    CommentViewSet,
    ImageViewSet
)


router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'tags', TagViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'images', ImageViewSet)
