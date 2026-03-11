from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'completed', 'priority', 'due_date', 'created_at', 'user')
        
        # Эти поля клиент не должен передавать при создании/обновлении.
        # user подставляется автоматически из токена, created_at генерируется БД.
        read_only_fields = ('id', 'created_at', 'user')