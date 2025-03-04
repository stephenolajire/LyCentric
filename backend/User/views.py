from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.conf import settings
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny
from django.http import HttpResponseRedirect
from django.shortcuts import redirect

User = get_user_model()
class SignupView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this view

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            verification_link = f"{settings.FRONTEND_URL}/confirm_email/{uid}/{token}"

            mail_subject = 'Activate your account'
            message = f"Click the link to activate your account: {verification_link}"
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [user.email])
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Log the validation errors
        print(serializer.errors)  # For debugging purposes
        return Response({"message":"Email has already been used"}, status=status.HTTP_400_BAD_REQUEST)



class VerifyEmailAddressView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        """Handle email verification"""
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"message": "Invalid activation link"}, status=status.HTTP_400_BAD_REQUEST)
        
        token_generator = PasswordResetTokenGenerator()
        if user is not None and token_generator.check_token(user, token):
            user.verified = True
            user.save()
            return Response({"message": "email confirmed!"}, status=status.HTTP_200_OK) 
        
        else:
            return Response({"message": "Invalid token!"}, status=status.HTTP_400_BAD_REQUEST)



class GetUserView(RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        user = self.request.user
        return User.objects.get(id=user.id)
    

class UpdateUserProfile(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return User.objects.get(id=user.id)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)  # Allow partial updates
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    

class VerifyEmailView(APIView):
    def post(self, request):
        email = request.data.get("email")
        user = User.objects.filter(email=email).first()

        if user:
            # Generate a password reset token
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)

            # Encode the user ID
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Create the reset password URL (you would replace this with your frontend URL)
            reset_url = f"{settings.FRONTEND_URL}/resetpassword/{uid}/{token}"

            # Send the email
            send_mail(
                subject="Password Reset Request",
                message=f"Hi {user.first_name} {user.last_name},\n\nClick the link below to reset your password:\n\n{reset_url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

            return Response({"message": "Password reset link sent to your email."}, status=200)
        else:
            return Response({"error": "User with this email does not exist."}, status=404)



class SetNewPasswordView(APIView):
    def put(self, request, uid, token, *args, **kwargs):
        # Decode the user ID from the uidb64 parameter
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Invalid token or user ID"}, status=status.HTTP_400_BAD_REQUEST)

        # Verify the reset token
        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired reset token"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the password and confirm_password from request data
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        # Check if passwords match
        if password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the new password is the same as the old one
        if user.check_password(password):
            return Response({"error": "You have already used this password before"}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(password)
        user.save()

        return Response({"message": "Password has been reset successfully"}, status=status.HTTP_202_ACCEPTED)


class CheckUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Check if the user is verified
        if not user.verified:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            verification_link = f"{settings.FRONTEND_URL}/confirm_email/{uid}/{token}"

            mail_subject = 'Activate your account'
            message = f"Click the link to activate your account: {verification_link}"
            send_mail(mail_subject, message, settings.EMAIL_HOST_USER, [user.email])
            user = User.objects.all()
            users = User.objects.all()

            # Calculate the total number of users
            total_users = users.count()

            return Response({"message": "Verification email sent.", "total_user":{total_users}}, status=200)

        return Response({"message": "User is already verified."}, status=200)