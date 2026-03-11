from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Пока оставляем пустым. Встроенных полей username/password нам хватит.
    pass