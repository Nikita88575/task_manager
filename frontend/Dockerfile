# frontend/Dockerfile
FROM node:24-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./
# Чистая установка по лок-файлу
RUN npm ci

# Копируем исходники
COPY . .

# Запускаем Vite с флагом --host, чтобы он "смотрел" наружу
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]