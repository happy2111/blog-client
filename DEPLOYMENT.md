# 🚀 Инструкция по развертыванию и запуску

## Предварительные требования

- **Node.js** 18.0.0 или выше
- **npm** 9.0.0 или выше (идет в комплекте с Node.js)
- **Бэкенд сервер** на адресе `http://localhost:8080` (для разработки)

## Локальная разработка

### 1. Установка зависимостей

```bash
cd blog-client
npm install
```

Это установит все необходимые пакеты:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- React Query (TanStack Query)
- Axios
- И другие

### 2. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Примечание**: Префикс `NEXT_PUBLIC_` делает переменную доступной в браузере. Используйте его только для нечувствительных данных.

### 3. Запуск dev сервера

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

**Hot Reload** включен по умолчанию - изменения в коде автоматически перезагружаются.

## Build для Production

### 1. Сборка проекта

```bash
npm run build
```

Это создаст оптимизированный build в папке `.next/`.

### 2. Запуск production сервера

```bash
npm start
```

Сервер будет доступен на [http://localhost:3000](http://localhost:3000).

## Docker развертывание

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8080
    depends_on:
      - backend

  backend:
    image: your-backend-image
    ports:
      - "8080:8080"
```

### Запуск с Docker

```bash
docker-compose up --build
```

## Деплой на Vercel

### 1. Создать Vercel аккаунт

Перейти на [vercel.com](https://vercel.com) и создать аккаунт.

### 2. Подключить Git репозиторий

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 3. Импортировать в Vercel

1. На Vercel перейти в Projects → Import Project
2. Выбрать свой Git репозиторий
3. Установить переменные окружения:
   - `NEXT_PUBLIC_API_URL` → `https://your-api.com`
4. Нажать Deploy

### 4. Автоматический деплой

Каждый push в main ветку автоматически запустит новый деплой.

## Деплой на AWS

### 1. Используя EC2

```bash
# SSH на сервер
ssh -i your-key.pem ubuntu@your-ec2-instance.com

# Установить Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Клонировать репозиторий
git clone <your-repo-url>
cd blog-client

# Установить зависимости и build
npm install
npm run build

# Запустить через PM2
npm install -g pm2
pm2 start npm --name "blog-client" -- start
pm2 save
```

### 2. Используя AWS Amplify

1. Подключить Git репозиторий
2. Разрешить автоматический build
3. Установить environment variables
4. Amplify автоматически развернет приложение

## Деплой на Netlify

### 1. Подключить Git репозиторий

```bash
npm install -g netlify-cli
netlify login
netlify init
```

### 2. Настроить build settings

```
Build command: npm run build
Publish directory: .next
```

### 3. Установить environment variables

1. Перейти в Site settings → Build & deploy → Environment
2. Добавить `NEXT_PUBLIC_API_URL`

### 4. Запустить деплой

```bash
netlify deploy --prod
```

## Мониторинг и логирование

### Просмотр логов в production

```bash
pm2 logs blog-client

# или с фильтром
pm2 logs blog-client --err
```

### Мониторинг процесса

```bash
pm2 monit
```

## Troubleshooting

### Build fails

```bash
# Очистить кэш
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### API не доступен

1. Проверить правильность `NEXT_PUBLIC_API_URL`
2. Убедиться что бэкенд запущен
3. Проверить CORS настройки на бэкенде

### Memory issues

Увеличить heap size:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Port уже занят

```bash
# Использовать другой порт
PORT=3001 npm start

# Или найти процесс и kill его
lsof -i :3000
kill -9 <PID>
```

## Performance optimization

### 1. Включить Static Generation

Для страниц б��з динамических данных:

```tsx
export const revalidate = 3600; // revalidate каждый час
```

### 2. Использовать Image Optimization

```tsx
import Image from 'next/image';

<Image 
  src={post.mediaUrl}
  alt="Post"
  width={600}
  height={600}
  placeholder="blur"
/>
```

### 3. Lazy Loading

Компоненты уже используют React.lazy и Suspense.

## Environment variables для разных окружений

### Development (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Staging (.env.staging)
```env
NEXT_PUBLIC_API_URL=https://staging-api.example.com
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Checklist перед production

- ✅ Установить правильный `NEXT_PUBLIC_API_URL`
- ✅ Включить HTTPS
- ✅ Настроить CORS на бэкенде
- ✅ Проверить все формы на валидацию
- ✅ Тестировать на мобильных устройствах
- ✅ Проверить скорость загрузки
- ✅ Включить мониторинг ошибок (Sentry)
- ✅ Настроить резервные копии
- ✅ Документировать процесс deployment
- ✅ Настроить alerting для ошибок

## Дополните��ьные команды

```bash
# Линтинг
npm run lint

# Type checking
npx tsc --noEmit

# Build анализ
npm run build -- --analyze

# Clean rebuild
rm -rf .next && npm run build

# Проверить что все работает
npm run dev &
npm test
```

## Поддержка и помощь

Если возникли проблемы:

1. Проверить логи: `npm run dev` с verbose
2. Проверить Network tab в браузере
3. Проверить console ошибки
4. Убедиться что все зависимости установлены
5. Пересоздать `.env.local`

---

**Дата обновления**: 2025-05-17

