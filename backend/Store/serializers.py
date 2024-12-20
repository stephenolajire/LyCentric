from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model ()


class HeroSerializer (serializers.ModelSerializer):
  class Meta:
    model = HeroSection
    fields = ['id', 'title', 'description', 'image']


class CategorySerializer (serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id', 'name', 'image']

class AudienceSerializer (serializers.ModelSerializer):
  class Meta:
    model = AudienceType
    fields = ['id', 'name']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'created']

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['id', 'size', 'created']

class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ['id', 'color', 'created']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    sizes = ProductSizeSerializer (many=True, read_only=True)
    colors = ProductColorSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 
                  'old_price', 'category', 'audience','stock', 
                  'available', 'created', 'updated', 'images', 
                  'sizes','colors',
                ]
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 
    total_price = serializers.SerializerMethodField()  # Calculating total price for the cart item
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price', 'size', 'color']  # Include the necessary fields

    def get_total_price(self, obj):
        return obj.quantity * obj.product.price


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # Display all items in the cart
    total_cart_price = serializers.SerializerMethodField()  # Total price of the cart
    total_quantity = serializers.SerializerMethodField()  # Total quantity of all items in the cart

    class Meta:
        model = Cart
        fields = ['id', 'cart_code', 'items', 'total_cart_price', 'total_quantity']  # Include the necessary fields

    def get_total_cart_price(self, obj):
        # Sum up the total price of each cart item
        return sum(item.quantity * item.product.price for item in obj.items.all())

    def get_total_quantity(self, obj):
        # Sum up the quantity of each cart item
        return sum(item.quantity for item in obj.items.all())
    

class RecentItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # Calculating total price for the cart item

    class Meta:
        model = RecentItem
        fields = ['id', 'product']  # Include the necessary fields
    

class RecentSerializer(serializers.ModelSerializer):
    items = RecentItemSerializer(many=True, read_only=True)  # Display all items in the cart

    class Meta:
        model = Recent
        fields = ['id', 'recent_code', 'items'] 


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'firstName', 'lastName', 'phoneNumber', 'email', 'state', 
                  'city', 'localGovernment', 'nearestBusStop', 'homeAddress', 'status', 
                  'amount', 'created', 'delivery']
        read_only_fields = ['created']

class OrderProductSerializer (serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_quantity', 'product_name', 'product_color', 'product_size' ]