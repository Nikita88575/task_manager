from typing import Optional

from django.conf import settings
from django.db import models


class Task(models.Model):
    PRIORITY_CHOICES = (
        ("HIGH", "High"),
        ("MEDIUM", "Medium"),
        ("LOW", "Low"),
    )

    user: models.ForeignKey = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tasks"
    )

    title: models.CharField = models.CharField(max_length=255)
    completed: models.BooleanField = models.BooleanField(default=False)
    priority: models.CharField = models.CharField(
        max_length=10, choices=PRIORITY_CHOICES, default="MEDIUM"
    )
    due_date: Optional[models.DateTimeField] = models.DateTimeField(
        null=True, blank=True, verbose_name="Дедлайн"
    )
    created_at: models.DateTimeField = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title
