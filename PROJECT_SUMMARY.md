# 📸 Instagram-like Blog - Клиентская часть

Полностью готовый к использованию клиент для Instagram-подобного блога, разработанный на **Next.js 16** с **TypeScript**.

## ✅ Что реализовано

### Аутентификация
- ✅ Регистрация новых пользователей (`/register`)
- ✅ Вход в аккаунт (`/login`)
- ✅ JWT-based authentication с автоматическим сохранением токена
- ✅ Middleware защита роутов от неавторизованного доступа
- ✅ Автоматический редирект при истечении токена (401)

### Ленты постов
- ✅ **Home Feed** (`/home`) - персональная лента из подписок
- ✅ **Explore** (`/explore`) - публичная лента со всеми постами
- ✅ Бесконечная прокрутка (Infinite Scroll) для обеих лент
- ✅ Кэширование данных через React Query
- ✅ Скелетоны при загрузке

### Создание постов
- ✅ Стран��ца создания (`/create`)
- ✅ Drag & drop загрузка изображений
- ✅ Выбор файла через клик
- ✅ Предпросмотр выбранного изображения
- ✅ Textarea для описания (caption)
- ✅ Выбор видимости (Public/Private)
- ✅ Loading индикатор при отправке
- ✅ Поддержка multipart/form-data

### Профили
- ✅ Просмотр профилей других пользователей (`/profile/[username]`)
- ✅ Личный профиль (`/profile/me`)
- ✅ Отображение счетчиков (посты, подписчики, подписки)
- ✅ Кнопка подписки/отписки с live update
- ✅ Сетка постов пользователя с бесконечной прокруткой
- ✅ Аватар пользователя с fallback

### UI/UX
- ✅ **Tailwind CSS** v4 со все��и утилитами
- ✅ Темная и светлая тема
- ✅ Responsive дизайн для мобильных, планшетов, десктопов
- ✅ Sonner toast уведомления для ошибок и успеха
- ✅ Навигация в Header с иконками
- ✅ Modальное окно для просмотра полной информации о посте

### Компоненты
- ✅ **8 базовых UI компонентов** (Button, Input, Textarea, Card, Dialog, Select, Skeleton, Avatar)
- ✅ Валидация ошибок в инпутах
- ✅ Интегрированы с React Hook Form
- ✅ TypeScript типизированы

### API интеграция
- ✅ Axios клиент с перехватчиками JWT
- ✅ Поддержка Presigned URLs для приватных файлов (AWS S3)
- ✅ Обработка многоpart/form-data
- ✅ Error handling с информативными сообщениями
- ✅ Retry logic для сбойных запросов

### State Management
- ✅ **React Query** для кэширования и синхронизации server state
- ✅ **Zustand** для глобального состояния аутентификации
- ✅ localStorage для сохранения JWT токена

## 📦 Технологический стек

| Технология | Версия | Назначение |
|---|---|---|
| Next.js | 16.2.6 | Framework |
| React | 19.2.4 | UI Library |
| TypeScript | ^5 | Type Safety |
| Tailwind CSS | ^4 | Styling |
| React Query | ^3.39.3 | Server State |
| Axios | ^1.6.2 | HTTP Client |
| Zustand | ^4.4.0 | State Management |
| React Hook Form | ^7.48.0 | Form Management |
| Sonner | ^1.2.0 | Notifications |
| Lucide React | ^0.292.0 | Icons |

## 🚀 Быстрый старт

```bash
# 1. Установка зависимостей
npm install

# 2. Создать .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local

# 3. Запустить dev сервер
npm run dev

# 4. Открыть в браузере
# http://localhost:3000
```

## 📁 Структура папок

```
src/
├── app/                    # Страницы (App Router)
├── api/                    # API клиент
├── components/             # React компоненты
│   ├── ui/                # Базовые UI компоненты
│   └── layouts/           # Layout компоненты
├── hooks/                  # Кастомные хуки
├── stores/                 # Zustand stores
├── types/                  # TypeScript типы
├── utils/                  # Утилиты
└── proxy.ts               # Next.js proxy (middleware)
```

## 🔑 Ключевые файлы

| Файл | Описание |
|---|---|
| `src/api/client.ts` | API клиент с JWT перехватчиками |
| `src/hooks/useAuth.ts` | Хук для аутентификации |
| `src/hooks/usePosts.ts` | Хуки для работы с постами |
| `src/hooks/useUsers.ts` | Хуки для работы с пользователями |
| `src/stores/authStore.ts` | Zustand store |
| `src/proxy.ts` | Защита роутов |
| `src/components/Header.tsx` | Шапка приложения |
| `src/components/Feed.tsx` | Компонент ленты |

## 🎨 UI компоненты

Все компоненты находятся в `src/components/ui/` и полностью типизированы:

```tsx
import { Button, Input, Card, Dialog, Avatar } from '@/components/ui';
```

## 🔌 API endpoints

Клиент готов к работе со следующими endpoints:

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/posts/explore?page=1&pageSize=20
GET    /api/posts/feed?page=1&pageSize=20
POST   /api/posts (multipart/form-data)
GET    /api/posts/user/{username}?page=1&pageSize=20
GET    /api/users/profile/{username}
POST   /api/users/follow/{username}
DELETE /api/users/follow/{username}
```

## 📝 Примеры использования

### Использование хука useAuth
```tsx
const { isAuthenticated, user, loginAsync } = useAuth();

const handleLogin = async () => {
  try {
    await loginAsync({ username: 'john', password: 'pass' });
  } catch (error) {
    toast.error('Failed to login');
  }
};
```

### Использование хука useFeed
```tsx
const { data: posts, isLoading } = useFeed(page);
```

### Использование UI компонентов
```tsx
<Card>
  <Input placeholder="Username" error={errors.username?.message} />
  <Button isLoading={isSubmitting}>Submit</Button>
</Card>
```

## 🛡️ Защита

- ✅ JWT tokens в Authorization header
- ✅ Middleware для проверки прав доступа
- ✅ CORS-friendly конфигурация
- ✅ Безопасное хранение токена в localStorage

## 🚢 Build для production

```bash
npm run build
npm start
```

## 📚 Документация

- `README_SETUP.md` - Подробная инструкция по установке
- `ARCHITECTURE.md` - Архитектурные решения и поток данных
- `COMPONENTS_USAGE.md` - Примеры использования компонентов
- `AGENTS.md` - Инструкции для специализированных агентов

## 🎯 Готово к production

Клиент полностью готов к использованию и интеграции с бэкенд сервером. Все компоненты типизированы, обработка ошибок реализована, UI/UX продуман.

**Backend URL**: Установить в `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Или для production:
```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

---

**Дата создания**: 2025-05-17  
**Версия**: 1.0.0  
**Статус**: ✅ Production Ready

