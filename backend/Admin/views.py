from django.shortcuts import render
from Store.models import *
from Store.serializers import *
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .paginations import CustomPagination
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model ()


class OrderHistoryView(ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class AllOrderView(ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    pagination_class = CustomPagination

class PaidOrderView(ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.filter(status="completed")
    pagination_class = CustomPagination



class SendOrderView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Get the order ID from request
            order_id = request.data.get("order_id")
            order = Order.objects.filter(id=order_id).first()

            if order.sent == "sent":
                return
            
            if not order:
                return Response({"error": "Order not found"}, status=404)
            
            # Get the user related to the order
            user = order.user
            
            # Compare emails
            if order.email == user.email:
                # Send email to the user
                send_mail(
                    subject="Your order is on the way",
                    message=f"Dear {order.firstName} {order.lastName},\n\nYour order is on its way.",
                    from_email={settings.EMAIL_HOST_USER},  # Change this to your actual email
                    recipient_list=[order.email],
                )
            else:
                # Send email to the user
                send_mail(
                    subject="Your order is on the way",
                    message=f"Dear {order.firstName} {order.lastName},\n\n Mr/Mrs {user.first_name} {user.last_name} made an order for you and the order is on its way to be delivered.",
                    from_email={settings.EMAIL_HOST_USER},  # Change this to your actual email
                    recipient_list=[order.email],
                )
                
                # Send notification to the original user
                send_mail(
                    subject="The paid order",
                    message=f"Dear {user.first_name} {user.last_name},\n\n The order you paid for Mr/Mrs {order.firstName} {order.lastName} with the (Order ID: {order.id}) its on the way to be delivered.",
                    from_email={settings.EMAIL_HOST_USER},  # Change this to your actual email
                    recipient_list=[user.email],
                )
            
            # Update order status
            order.sent = "sent"
            order.save()
            
            return Response({"message": "Order marked as sent and email notifications sent successfully."})
        
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class DeliverOrderView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Get the order ID from request
            order_id = request.data.get("order_id")
            order = Order.objects.filter(id=order_id).first()

            if order.delivered == "delivered":
                return
            
            if not order:
                return Response({"error": "Order not found"}, status=404)
            
            # Get the user related to the order
            user = order.user
            
            # Compare emails
            if order.email == user.email:
                # Send email to the user
                send_mail(
                    subject="Your order has been delivered",
                    message=f"Dear {order.firstName} {order.lastName},\n\nYour order has just been delivered. \n\n Thanks for your patronage.",
                    from_email={settings.EMAIL_HOST_USER},  # Change this to your actual email
                    recipient_list=[order.email],
                )
            else:
                # Send email to the user
                send_mail(
                    subject="Your order is delivered",
                    message=f"Dear {order.firstName} {order.lastName},\n\n The order made by Mr/Mrs {user.first_name} {user.last_name} for you has just been delivered. \n\n Thanks for the patronage",
                    from_email={settings.EMAIL_HOST_USER},  # Change this to your actual email
                    recipient_list=[order.email],
                )
                
                # Send notification to the original user
                send_mail(
                    subject="The paid order",
                    message=f"Dear {user.first_name} {user.last_name},\n\n The order you paid for Mr/Mrs {order.firstName} {order.lastName} with the (Order ID: {order.id}) has just been delivered. \n\n Thanks for the patronage. ",
                    from_email={settings.EMAIL_HOST_USER},  # Change this to your actual email
                    recipient_list=[user.email],
                )
            
            # Update order status
            order.delivered = "delivered"
            order.save()
            
            return Response({"message": "Order marked as sent and email notifications sent successfully."})
        
        except Exception as e:
            return Response({"error": str(e)}, status=500)