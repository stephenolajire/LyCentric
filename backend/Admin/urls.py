from django.urls import path
from .views import *

urlpatterns = [
    path ("orderhistory", OrderHistoryView.as_view()),
    path ("allorders", AllOrderView.as_view()),
    path ("paidorders", PaidOrderView.as_view()),
    path ("send", SendOrderView.as_view()),
    path ("deliver", DeliverOrderView.as_view()),
]