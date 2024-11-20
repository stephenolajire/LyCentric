from django.urls import path
from .views import *

urlpatterns = [
    path ("orderhistory", OrderHistoryView.as_view()),
    path ("allorders", AllOrderView.as_view())
]