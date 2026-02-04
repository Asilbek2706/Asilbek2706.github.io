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
        if self.image and os.path.exists(self.image.path):
            try:
                self.optimize_image(self.image.path, (1080, 1080))
            except Exception as e:
                print(f"Rasm optimizatsiya xatosi: {e}")

    def optimize_image(self, path, size):
        img = Image.open(path)
        if img.height > size[1] or img.width > size[0]:
            img.thumbnail(size)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            img.save(path, quality=85, optimize=True)

class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name="Foydalanuvchi")
    email = models.EmailField(verbose_name="E-pochta")
    subject = models.CharField(max_length=200, verbose_name="Mavzu")
    message = models.TextField(verbose_name="Foydalanuvchi xabari")
    admin_reply = models.TextField(blank=True, null=True, verbose_name="Admin javobi")
    is_answered = models.BooleanField(default=False, verbose_name="Javob berildi")
    likes = models.PositiveIntegerField(default=0, verbose_name="Reaksiyalar")
    user_ip = models.GenericIPAddressField(blank=True, null=True)
    is_read = models.BooleanField(default=False, verbose_name="O'qildi")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yuborilgan vaqt")

    class Meta:
        verbose_name = "Xabar"
        verbose_name_plural = "Xabarlar"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"

    def save(self, *args, **kwargs):
        if self.admin_reply:
            self.is_answered = True
            self.is_read = True
        super().save(*args, **kwargs)

class Profile(models.Model):
    full_name = models.CharField(max_length=100, verbose_name="To'liq ism")
    image = models.ImageField(upload_to='profile/', verbose_name="Profil rasmi")
    bio = models.TextField(verbose_name="Tarjimai hol")
    short_bio = models.CharField(max_length=255, blank=True, verbose_name="Qisqa ma'lumot")
    email = models.EmailField(verbose_name="Email")
    telegram = models.URLField(blank=True, verbose_name="Telegram")
    instagram = models.URLField(blank=True, verbose_name="Instagram")
    github = models.URLField(blank=True, verbose_name="GitHub")
    linkedin = models.URLField(blank=True, verbose_name="LinkedIn")

    class Meta:
        verbose_name = "Profil"
        verbose_name_plural = "Profiller"

    def __str__(self):
        return self.full_name  # BU SHART! Aks holda Admin panel 500 beradi.

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image and os.path.exists(self.image.path):
            try:
                img = Image.open(self.image.path)
                img.thumbnail((800, 800))
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(self.image.path, quality=90, optimize=True)
            except Exception as e:
                print(f"Profil rasm xatosi: {e}")