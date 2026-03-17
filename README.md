# 📝 Task Manager API & Проектна Документація

Сучасний, швидкий та безпечний веб-додаток для управління завданнями (Task Manager), побудований за принципом Single Page Application (SPA). 

Цей документ містить специфікацію REST API та інструкції з розгортання проекту для розробників (як локально, так і через Docker).

## 🛠 Технологічний стек
- **Frontend:** React.js, Vite, Axios
- **Backend:** Python 3.13, Django, Django REST Framework (DRF), Djoser (JWT)
- **База даних:** PostgreSQL 18
- **Інфраструктура:** Docker, Docker Compose

---

# 🚀 Варіант 1: Локальне розгортання для розробки (Без Docker)

Цей спосіб підходить для активної розробки, написання коду та дебагу. 

У вас повинні бути встановлені Python (3.13+), Node.js (24+) та локальний сервер PostgreSQL.

### 1. Клонування репозиторію
```bash
git clone https://github.com/Nikita88575/task_manager.git
або
git clone git@github.com:Nikita88575/task_manager.git
cd task-manager
```

---

## 🤖 Налаштування Backend (Django)

### Відкрийте термінал у кореневій папці проекту:
```bash
cd backend
```

### Створення та активація віртуального середовища
```bash
python -m venv venv
source venv/bin/activate  # Для Windows: venv\Scripts\activate
```

### Встановлення залежностей
```bash
pip install -r requirements.txt
```

Налаштування БД (переконайтеся, що створили базу task_db у своєму локальному Postgres)

Скопіюйте приклад .env файлу та заповніть свої дані
```bash
cp .env.example .env
```

### Застосування міграцій бази даних
```bash
python manage.py migrate
```

### Запуск локального сервера розробки
```bash
python manage.py runserver
```

***Бекенд буде доступний за адресою: http://localhost:8000***

---

## 🌱 Налаштування Frontend (React)

### Відкрийте нову вкладку терміналу:
```bash
cd frontend
```

### Встановлення всіх залежностей (npm install)
```bash
npm install
```

### Запуск сервера розробки Vite
```bash
npm run dev
```

***Фронтенд буде доступний за адресою: http://localhost:5173***

---

# 🐳 Варіант 2: Швидке розгортання через Docker

Цей варіант ідеально підходить для тестування цілісної системи або розгортання на Production-сервері. Вам потрібен лише встановлений Docker.

Створіть файл .env у корені проекту (якщо його ще немає) і виконайте одну команду:
```bash
docker-compose up -d --build
```

Щоб зупинити систему:
```bash
docker-compose stop
```

---

## 📖 Специфікація REST API (API Reference)

Усі запити відправляються на базовий префікс: ***http://localhost:8000/api/***.

Для захищених маршрутів необхідно передавати заголовок: ***Authorization: Bearer <access_token>***.

### 🔐 1. Автентифікація (Auth & Users)

Використовується бібліотека Djoser + SimpleJWT.

| Метод | Ендпоінт | Опис | Тіло запиту (JSON) | Відповідь (Успіх) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/auth/users/` | Реєстрація користувача | `{"username": "user1", "password": "pwd"}` | `201 Created` |
| **POST** | `/auth/jwt/create/` | Отримання токенів (Login) | `{"username": "user1", "password": "pwd"}` | `200 OK` (access, refresh) |
| **POST** | `/auth/jwt/refresh/` | Оновлення Access-токена | `{"refresh": "..."}` | `200 OK` (access) |

### 📋 2. Управління завданнями (Tasks)

Усі маршрути нижче вимагають авторизації.

| Метод | Ендпоінт | Опис | Тіло запиту (JSON) | Відповідь (Успіх) |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/tasks/` | Отримати всі завдання | ***None*** | `200 OK [{"id": 1, ...}]` |
| **POST** | `/tasks/` | Створити завдання | `{"username": "user1", "password": "pwd"}` | `201 Created` |
| **PATCH** | `/tasks/{id}/` | Часткове оновлення | `{"refresh": "..."}` | `200 OK` (access) |
| **DELETE** | `/tasks/{id}/` | Видалення завдання | ***None*** | `204 No Content` |

### 📄 3. Структура моделі <code>Task</code>

```JSON
{
  "id": 1,
  "title": "Назва завдання",
  "completed": false,
  "priority": "medium",
  "deadline": "2026-03-20T15:30:00Z",
  "created_at": "2026-03-17T10:00:00Z",
  "user": 5
}
```
