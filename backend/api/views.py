import requests
from django.conf import settings
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import action
from .models import Project, ContactMessage, Profile
from .serializers import ProjectSerializer, ContactMessageSerializer, ProfileSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """Loyiha ma'lumotlarini faqat o'qish uchun."""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ContactViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin, # <--- BU YERDA O'CHIRISH RUXSATI QO'SHILDI
    viewsets.GenericViewSet
):
    """
    Kontakt formasi, Message Center logikasi va O'chirish funksiyasi.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [AnonRateThrottle]

    def get_queryset(self):
        """
        Filtr: /api/contact/?email=user@example.com
        """
        queryset = ContactMessage.objects.all()
        email = self.request.query_params.get('email')
        if email:
            queryset = queryset.filter(email=email)
        return queryset

    def create(self, request, *args, **kwargs):
        # IP manzilni olish
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        ip = x_forwarded_for.split(',')[0].strip() if x_forwarded_for else request.META.get('REMOTE_ADDR')

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save(user_ip=ip)

            # Telegram xabarnomasi
            try:
                self.send_telegram_notification(instance, ip)
            except Exception as e:
                print(f"Telegram Notification failed: {e}")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], url_path='like')
    def like_message(self, request, pk=None):
        """
        PATCH /api/contact/{id}/like/
        """
        message = self.get_object()
        message.likes += 1
        message.save()
        return Response({'likes': message.likes}, status=status.HTTP_200_OK)

    def send_telegram_notification(self, instance, ip):
        bot_token = settings.TELEGRAM_BOT_TOKEN
        chat_id = settings.TELEGRAM_CHAT_ID

        if not (bot_token and chat_id):
            return

        message_text = (
            f"🚀 <b>Yangi Xabar (Portfolio)</b>\n"
            f"━━━━━━━━━━━━━━━━━━\n"
            f"👤 <b>Ism:</b> {instance.name}\n"
            f"📧 <b>Email:</b> {instance.email}\n"
            f"📌 <b>Mavzu:</b> {instance.subject}\n"
            f"🌐 <b>IP:</b> {ip}\n\n"
            f"💬 <b>Xabar:</b>\n{instance.message}\n"
            f"━━━━━━━━━━━━━━━━━━"
        )

        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = {"chat_id": chat_id, "text": message_text, "parse_mode": "HTML"}
        try:
            requests.post(url, data=payload, timeout=5)
        except Exception as e:
            print(f"Telegram send error: {e}")

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """Profil ma'lumotlari."""
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if queryset.exists():
            serializer = self.get_serializer(queryset.first())
            return Response(serializer.data)
        return Response({"error": "Profil topilmadi"}, status=status.HTTP_404_NOT_FOUND)