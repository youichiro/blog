from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from blog.urls import router

admin.site.site_title = 'cinnamon blog'
admin.site.site_header = 'cinnamon blog'

urlpatterns = [
    path('markdownx/', include('markdownx.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
