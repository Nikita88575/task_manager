# backend/Dockerfile
FROM python:3.13-slim

# Запрещаем Python писать .pyc файлы на диск и буферизовать вывод
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Сначала копируем только requirements, чтобы закэшировать установку слоев
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем скрипт инициализации и даем права на выполнение
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY . .

# ENTRYPOINT выполняется всегда перед CMD
ENTRYPOINT ["/entrypoint.sh"]

# А это аргументы, которые передадутся в скрипт вместо "$@"
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]