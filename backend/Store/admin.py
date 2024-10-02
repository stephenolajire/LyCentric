from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class HeroAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'id']
    search_fields = ['title']
    ordering = ['created']
admin.site.register(HeroSection, HeroAdmin)

admin.site.register(AudienceType)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Product)
admin.site.register(Cart)
# admin.site.register(CartItem)

class CartItems(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity', 'id']
    search_fields = ['cart']
admin.site.register(CartItem, CartItems)