from django.db import models
from PIL import Image
import os

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Loyiha nomi")
    category = models.CharField(max_length=100, default="Web Development", verbose_name="Kategoriya")
    year = models.CharField(max_length=4, default="2026", verbose_name="Yil")
    objective = models.TextField(default="Loyiha maqsadi...", verbose_name="Maqsad")
    solution = models.TextField(default="Texnik yechim...", verbose_name="Yechim")
    image = models.ImageField(upload_to='projects/', verbose_name="Loyiha rasmi")
    tech_stack = models.CharField(
        max_length=250,
        default="React, JS",
        help_text="Vergul bilan ajrating (Masalan: React, Django, PostgreSQL)",
        verbose_name="Texnologiyalar"
    )
    github_link = models.URLField(blank=True, null=True, verbose_name="GitHub")
    demo_link = models.URLField(blank=True, null=True, verbose_name="Live Demo")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Loyiha"
        verbose_name_plural = "Loyihalar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            try:
                self.optimize_image(self.image.path)
            except Exception: pass

    def optimize_image(self, image_path):
        if os.path.exists(image_path):
            img = Image.open(image_path)
            if img.height > 1080 or img.width > 1080:
                img.thumbnail((1080, 1080))
                img.save(image_path, quality=85, optimize=True)

# --- TAHRIRLANGAN CONTACTMESSAGE ---
class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="Foydalanuvchi")
    email = models.EmailField(verbose_name="E-pochta")
    subject = models.CharField(max_length=200, verbose_name="Mavzu")
    message = models.TextField(verbose_name="Foydalanuvchi xabari")

    # Message Center uchun yangi maydonlar
    admin_reply = models.TextField(blank=True, null=True, verbose_name="Admin javobi")
    is_answered = models.BooleanField(default=False, verbose_name="Javob berildi")
    likes = models.PositiveIntegerField(default=0, verbose_name="Reaksiyalar")

    # Texnik ma'lumotlar
    user_ip = models.GenericIPAddressField(blank=True, null=True)
    is_read = models.BooleanField(default=False, verbose_name="O'qildi")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yuborilgan vaqt")

    class Meta:
        verbose_name = "Xabar"
        verbose_name_plural = "Xabarlar"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"

    # Javob yozilganda avtomatik statusni o'zgartirish
    def save(self, *args, **kwargs):
        if self.admin_reply:
            self.is_answered = True
            self.is_read = True
        super().save(*args, **kwargs)

class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='profile/')
    bio = models.TextField()
    short_bio = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    telegram = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            try:
                self.optimize_image(self.image.path)
            except Exception: pass

    def optimize_image(self, image_path):
        if os.path.exists(image_path):
            img = Image.open(image_path)
            img.thumbnail((800, 800))
            img.save(image_path, quality=90, optimize=True)