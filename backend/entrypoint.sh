#!/bin/bash

echo "Накатываем миграции базы данных..."
python manage.py migrate --noinput

echo "Запускаем сервер Django..."
# Эта команда берет то, что передано в CMD внутри Dockerfile, и выполняет
exec "$@"