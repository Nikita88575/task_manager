from django.db.models import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import (
    BaseSerializer,  # <-- Добавили импорт базового сериализатора
)

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]  # Доступ только по JWT токену

    # Подключаем фильтры и поиск
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["completed", "priority"]  # ?completed=True&priority=HIGH
    search_fields = ["title"]  # ?search=молоко
    ordering_fields = ["created_at", "priority"]
    ordering = ["-created_at"]  # По умолчанию сначала новые

    def get_queryset(self) -> QuerySet:
        # ИЗОЛЯЦИЯ ДАННЫХ: юзер видит только свои таски.
        user = self.request.user

        # Явная проверка для Mypy, чтобы отсечь AnonymousUser
        if user.is_authenticated:
            return Task.objects.filter(user=user)
        return (
            Task.objects.none()
        )  # Если вдруг зайдет аноним (чего не будет), возвращаем пустой список

    # <-- Добавили аннотацию типа serializer: BaseSerializer
    def perform_create(self, serializer: BaseSerializer) -> None:
        user = self.request.user

        # Снова доказываем Mypy, что юзер существует
        if user.is_authenticated:
            serializer.save(user=user)
