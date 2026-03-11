# backend/tasks/views.py
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated] # Доступ только по JWT токену
    
    # Подключаем фильтры и поиск
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['completed', 'priority'] # ?completed=True&priority=HIGH
    search_fields = ['title']                    # ?search=молоко
    ordering_fields = ['created_at', 'priority'] 
    ordering = ['-created_at']                   # По умолчанию сначала новые

    def get_queryset(self):
        # ИЗОЛЯЦИЯ ДАННЫХ: юзер видит только свои таски.
        # self.request.user берется из JWT токена.
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # При POST запросе автоматически привязываем задачу к текущему юзеру
        serializer.save(user=self.request.user)