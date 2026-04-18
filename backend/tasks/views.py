from django.db.models import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import BaseSerializer

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["completed", "priority"]
    search_fields = ["title"]
    ordering_fields = ["created_at", "priority"]
    ordering = ["-created_at"]

    def get_queryset(self) -> QuerySet:
        user = self.request.user

        if user.is_authenticated:
            return Task.objects.filter(user=user)
        return Task.objects.none()

    def perform_create(self, serializer: BaseSerializer) -> None:
        user = self.request.user

        if user.is_authenticated:
            serializer.save(user=user)
