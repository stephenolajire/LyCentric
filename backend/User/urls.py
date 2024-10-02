from django.urls import path
from . views import *


urlpatterns = [
  path("signup/", SignupView.as_view()),
  path("profile", GetUserView.as_view()),
  path("user/update/", UpdateUserProfile.as_view()),
]