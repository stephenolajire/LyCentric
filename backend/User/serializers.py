from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone_number', 
            'state', 'country', 'city_or_town', 'local_government', 
            'nearest_bus_stop', 'house_address', 'date_joined', 
            'password', 'verified', 'profile_image'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_image = validated_data.pop('profile_image', None)
        validated_data['password'] = make_password(validated_data.get('password'))
        user = User.objects.create(**validated_data)
        
        if profile_image:
            user.profile_image = profile_image
            user.save()
        
        return user

    def update(self, instance, validated_data):
        # Handle profile image separately to support updates
        profile_image = validated_data.pop('profile_image', None)
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Update profile image if provided
        if profile_image:
            instance.profile_image = profile_image
        
        instance.save()
        return instance
