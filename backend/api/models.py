from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    CATEGORY_CHOICES = [
        ('work', 'Work'),
        ('personal', 'Personal'),
        ('ideas', 'Ideas'),
        ('project', 'Project'),
        ('meeting', 'Meeting'),
    ]
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_favorite = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    class Meta:
        ordering = ['-updated_at', '-created_at']

    def __str__(self):
        return self.title
