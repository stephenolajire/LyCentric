from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import*
from .serializers import*
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from uuid import UUID
from rest_framework.response import Response

class HeroView(ListAPIView):
  serializer_class = HeroSerializer
  queryset = HeroSection.objects.all()

class CategoryView (ListAPIView):
  serializer_class = CategorySerializer
  queryset = Category.objects.all()

class AudienceView (ListAPIView):
  serializer_class = AudienceSerializer
  queryset = AudienceType.objects.all()

class AllProductsView (ListAPIView):
  serializer_class = ProductSerializer
  queryset = Product.objects.all()

class CategoryItemView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        uuid = self.kwargs.get('categoryId')
        
        try:
            UUID(str(uuid))
        except ValueError:
            return Product.objects.none()
        
        return Product.objects.filter(category=uuid)

class CategoryAudienceView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('categoryId')
        audience_id = self.kwargs.get('audienceId')

        try:
            # Validate UUIDs
            UUID(str(category_id))
            UUID(str(audience_id))
        except ValueError:
            return Product.objects.none()

        # Filter products by both category and audience
        return Product.objects.filter(category=category_id, audience=audience_id)

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        # Get the current product by id
        product = self.get_object()

        # Serialize the current product
        product_serializer = self.get_serializer(product)

        # Get similar products by category and audience, excluding the current product
        similar_products = Product.objects.filter(
            category=product.category,
            audience=product.audience
        ).exclude(id=product.id)[:12]  # Limit to 12 similar products

        # Serialize the similar products
        similar_products_serializer = ProductSerializer(similar_products, many=True, context={'request': request})

        # Return the main product and similar products
        return Response({
            'product': product_serializer.data,
            'similar_products': similar_products_serializer.data
        })
    

class AddToCartView(CreateAPIView):
    serializer_class = CartItemSerializer

    def create(self, request, *args, **kwargs):
        # Get the cart code from request data or generate a new one
        cart_code = request.data.get('cart_code')
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        # Check if a cart with the given code exists
        if cart_code:
            cart, created = Cart.objects.get_or_create(cart_code=cart_code)
        else:
            return Response({"error": "Cart code is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the cart item already exists, update or create it
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product_id=product_id)
        if not item_created:
            cart_item.quantity += int(quantity)  # Update quantity
            cart_item.save()

        return Response({
            'cart_code': cart.cart_code,
            'product_id': cart_item.product_id,
            'quantity': cart_item.quantity
        }, status=status.HTTP_200_OK)
   

class CartItemView(ListAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        cart_code = self.kwargs.get('cart_code')  # Get cart_code from the URL parameters

        try:
            if cart_code:
                # Filter the Cart using the cart_code and retrieve related items
                cart = Cart.objects.get(cart_code=cart_code)
                return Cart.objects.filter(id=cart.id)  # Get the cart with its items
        except Cart.DoesNotExist:
            return Cart.objects.none()


class IncrementCartItemView(UpdateAPIView):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def update(self, request, *args, **kwargs):
        cart_code = request.data.get('cart_code')
        item_id = request.data.get('item_id')

        if not cart_code or not item_id:
            return Response({"error": "cart_code and item_id are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.get(cart_code=cart_code)
            cart_item = CartItem.objects.get(cart=cart, id=item_id)
            cart_item.quantity += 1
            # cart_item.total_price = cart_item.product.price * cart_item.quantity
            cart_item.save()
            return Response({"message": "Update successful"}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Invalid cart_code."}, status=status.HTTP_404_NOT_FOUND)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found in the cart."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DecrementCartItemView(UpdateAPIView):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def update(self, request, *args, **kwargs):
        cart_code = request.data.get('cart_code')
        item_id = request.data.get('item_id')

        if not cart_code or not item_id:
            return Response({"error": "cart_code and item_id are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.get(cart_code=cart_code)
            cart_item = CartItem.objects.get(cart=cart, id=item_id)
            cart_item.quantity -= 1
            # cart_item.total_price = cart_item.product.price * cart_item.quantity
            cart_item.save()
            return Response({"message": "Update successful"}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Invalid cart_code."}, status=status.HTTP_404_NOT_FOUND)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found in the cart."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DeleteView(DestroyAPIView):
    def delete(self, request, *args, **kwargs):
        cart_code = request.data.get("cart_code")
        item_id = request.data.get("item_id")

        if not cart_code or not item_id:  # Fixed the condition
            return Response({"message": "Invalid cart code or item id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.get(cart_code=cart_code)
            cart_item = CartItem.objects.get(cart=cart, id=item_id)
            cart_item.delete()

            return Response({"message": "Item has been deleted successfully"}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
