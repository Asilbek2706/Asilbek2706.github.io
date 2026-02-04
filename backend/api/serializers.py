from rest_framework import serializers
from .models import Project, ContactMessage, Profile
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class ProfileSerializer(serializers.ModelSerializer):
    """
    Profil ma'lumotlari serializatsiyasi.
    """
    class Meta:
        model = Profile
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    """
    Loyiha ma'lumotlari.
    tech_stack_list: Vergul bilan yozilgan texnologiyalarni massiv ko'rinishida qaytaradi.
    """
    tech_stack_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'category', 'year', 'objective',
            'solution', 'tech_stack', 'tech_stack_list',
            'image', 'github_link', 'demo_link', 'created_at'
        ]

    def get_tech_stack_list(self, obj):
        if obj.tech_stack:
            return [tech.strip() for tech in obj.tech_stack.split(',')]
        return []


class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Message Center va Kontakt formasi uchun asosiy serializer.
    Foydalanuvchi faqat kerakli maydonlarni yubora oladi,
    admin javobi va likes faqat o'qish uchun (read_only).
    """
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'subject', 'message',
            'admin_reply', 'is_answered', 'likes',
            'user_ip', 'is_read', 'created_at'
        ]
        # Bu maydonlarni foydalanuvchi frontenddan POST qila olmaydi
        read_only_fields = [
            'id', 'admin_reply', 'is_answered',
            'likes', 'user_ip', 'is_read', 'created_at'
        ]

    def validate_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("Ism kamida 2 ta belgidan iborat bo'lishi kerak.")
        return value

    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Email manzili noto'g'ri formatda.")
        return value