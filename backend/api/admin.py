from django.contrib import admin
from .models import Project, ContactMessage, Profile

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'year', 'created_at')
    list_filter = ('category', 'year', 'created_at')
    search_fields = ('title', 'tech_stack', 'objective')
    list_editable = ('year',)

    fieldsets = (
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'category', 'year', 'image')
        }),
        ('Texnik tafsilotlar', {
            'fields': ('objective', 'solution', 'tech_stack')
        }),
        ('Havolalar', {
            'fields': ('github_link', 'demo_link')
        }),
    )

@admin.register(ContactMessage)
class ContactAdmin(admin.ModelAdmin):
    # Message Center holatini ko'rib turish uchun yangi maydonlar qo'shildi
    list_display = ('name', 'subject', 'is_answered', 'is_read', 'likes', 'created_at')
    list_filter = ('is_answered', 'is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')

    # Foydalanuvchi yuborgan ma'lumotlarni o'zgartirib bo'lmaydi (readonly)
    # Faqat admin_reply va likes ni tahrirlash mumkin
    readonly_fields = ('name', 'email', 'subject', 'message', 'user_ip', 'created_at')

    # Admin panelda bloklarga ajratish
    fieldsets = (
        ('Foydalanuvchi ma\'lumotlari', {
            'fields': ('name', 'email', 'subject', 'message', 'user_ip', 'created_at'),
            'description': "Foydalanuvchi tomonidan yuborilgan asl ma'lumotlar."
        }),
        ('Javob berish va Interaction', {
            'fields': ('admin_reply', 'is_answered', 'likes'),
            'classes': ('wide',),
            'description': "Shu yerga javob yozsangiz, foydalanuvchi Message Center'da ko'radi."
        }),
    )

    actions = ['mark_as_read', 'mark_as_answered']

    @admin.action(description="Tanlangan xabarlarni o'qilgan deb belgilash")
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)

    @admin.action(description="Tanlangan xabarlarni javob berilgan deb belgilash")
    def mark_as_answered(self, request, queryset):
        queryset.update(is_answered=True, is_read=True)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email')
    search_fields = ('full_name', 'email')