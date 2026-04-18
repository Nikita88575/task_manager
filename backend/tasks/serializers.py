from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "id",
            "title",
            "completed",
            "priority",
            "due_date",
            "created_at",
            "user",
        )

        read_only_fields = ("id", "created_at", "user")
