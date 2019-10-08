from django.contrib import admin
from django.utils.html import mark_safe
from markdownx.admin import MarkdownxModelAdmin
from .models import Category, Tag, Post, Comment, Image


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'color', 'order')
    ordering = ('id',)


class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'color', 'order')
    ordering = ('id',)


class PostAdmin(MarkdownxModelAdmin):
    list_display = ('title', 'category', '_tags', '_content', 'created_at', 'updated_at')
    ordering = ('id',)
    filter_horizontal = ('tags',)

    def _content(self, obj):
        return obj.content[:100]

    def _tags(self, obj):
        return ', '.join([tag.name for tag in obj.tags.all()])

    _content.short_description = 'content'
    _tags.short_description = 'tags'


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'text', 'post', 'created_at')
    ordering = ('id',)


class ImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'src', '_image', 'created_at', 'updated_at')
    ordering = ('id',)

    def _image(self, obj):
        return mark_safe("<img src={} style='width: auto; height: 60px;' />".format(obj.link()))

    _image.allow_tags = True


admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Image, ImageAdmin)
