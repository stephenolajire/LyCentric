from django.shortcuts import render
from Store.models import *
from Store.serializers import *
from rest_framework.generics import ListAPIView
from django.contrib.auth import get_user_model
from .paginations import CustomPagination

User = get_user_model ()


class OrderHistoryView(ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    pagination_class = CustomPagination
