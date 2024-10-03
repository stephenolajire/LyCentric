from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class HeroAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'id']
    search_fields = ['title']
    ordering = ['created']
admin.site.register(HeroSection, HeroAdmin)

class ProductImageInline (admin.TabularInline):
    model = ProductImage
    raw_id_fields = ['product']

class ProductImageInline (admin.TabularInline):
    model = ProductImage
    raw_id_fields = ['product']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'old_price', 'category', 'audience', 'size', 'stock', 'available', 'created', 'updated']
    search_fields = ['name']
    ordering = ['created']
    inlines = [ProductImageInline]
admin.site.register(Product, ProductAdmin)
# admin.site.register(ProductImageInline)



admin.site.register(AudienceType)
admin.site.register(Category)
admin.site.register(Cart)


class CartItems(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity', 'id']
    search_fields = ['cart']
admin.site.register(CartItem, CartItems)