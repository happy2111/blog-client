# Instagram-like Blog Client

Полнофункциональный клиент блога в стиле Instagram, разработанный на Next.js 16 с TypeScript.

## 🚀 Особенности

- **Аутентификаци��**: JWT-based authentication с сохранением токена в localStorage
- **Ленты постов**: Публичная лента (Explore) и приватная лента для подписчиков (Home)
- **Профили**: Просмотр профилей пользователей, подписка/отписка
- **Создание постов**: Загрузка изображений с дропом, выбор видимости (Public/Private)
- **Бесконечная прокрутка**: Автоматическая загрузка постов при прокрутке
- **Responsive дизайн**: Адаптивный интерфейс для всех размеров экранов
- **Error handling**: Перехват и отображение ошибок API

## 📋 Требования

- Node.js 18+
- npm или yarn

## 🛠️ Установка

1. **Клонировать репозиторий**
   ```bash
   git clone <repository-url>
   cd blog-client
   ```

2. **Установить зависимости**
   ```bash
   npm install
   ```

3. **Настроить переменные окружения**
   
   Создать файл `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Запустить dev сервер**
   ```bash
   npm run dev
   ```

   Открыть [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
src/
├── app/                      # Next.js App Router страницы
│   ├── login/               # Страница логина
│   ├── register/            # Страница регистрации
│   ├── home/                # Главная лента
│   ├── explore/             # Публичная лента
│   ├── create/              # Создание поста
│   ├── profile/[username]/  # Профиль пользователя
│   └── page.tsx             # Редирект на главную/explore
├── api/
│   └── client.ts            # API клиент с Axios + JWT interceptors
├── components/
│   ├── ui/                  # Базовые UI компоненты
│   ├── Header.tsx           # Шапка приложения
│   ├── Feed.tsx             # Компонент ленты
│   ├── PostCard.tsx         # Карточка поста
│   ├── UserProfile.tsx      # Профиль пользователя
│   ├── LoginForm.tsx        # Форма входа
│   ├── RegisterForm.tsx     # Форма регистрации
│   └── CreatePostForm.tsx   # Форма с��здания поста
├── hooks/
│   ├── useAuth.ts           # Хук для аутентификации
│   ├── usePosts.ts          # Хуки для работы с постами
│   ├── useUsers.ts          # Хуки для работы с пользователями
│   └── useCurrentUser.ts    # Хук для текущего пользователя
├── stores/
│   └── authStore.ts         # Zustand store для состояния аутентификации
├── types/
│   └── index.ts             # TypeScript типы
├── utils/
│   ├── queryClient.ts       # React Query конфигурация
│   ├── dateUtils.ts         # Утилиты для работы с датами
│   └─��� errorHandler.ts      # Обработка ошибок
├── proxy.ts                 # Proxy для защиты роутов
└── globals.css              # Глобальные стили с Tailwind
```

## 🔐 API Endpoints

Клиент взаимодействует со следующими эндпоинтами:

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### Посты
- `GET /api/posts/explore` - Публичные посты
- `GET /api/posts/feed` - Лента подписок
- `POST /api/posts` - Создание поста (multipart/form-data)
- `GET /api/posts/user/{username}` - Посты пользователя

### Пользователи
- `GET /api/users/profile/{username}` - Профиль пользователя
- `POST /api/users/follow/{username}` - Подписаться
- `DELETE /api/users/follow/{username}` - Отписаться

## 🔑 Управление токеном

Токен автоматически:
- Сохраняется в `localStorage` при успешной аутентификации
- Добавляется ко всем запросам в заголовок `Authorization: Bearer <token>`
- Очищается при выходе или при ошибке 401

## 🎨 Компоненты

### UI компоненты (находятся в `src/components/ui/`)
- `Button` - Кнопка с поддержкой loading состояния
- `Input` - Текстовое поле с обработ��ой ошибок
- `Textarea` - Многострочное текстовое поле
- `Card` - Карточка контента
- `Dialog` - Модальное окно
- `Select` - Выпадающее меню
- `Skeleton` - Скелетон для загрузки
- `Avatar` - Аватар пользователя

## 🚀 Build и Deploy

1. **Собрать проект**
   ```bash
   npm run build
   ```

2. **Запустить production сервер**
   ```bash
   npm start
   ```

## 📦 Зависимости

- **Next.js 16** - React фреймворк
- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **React Query** - Управление состоянием и кэширование
- **Axios** - HTTP клиент
- **Zustand** - State management
- **React Hook Form** - Управление формами
- **Sonner** - Уведомления
- **Lucide React** - Иконки

## ✅ Реализованный функционал

- ✅ Регистрация и вход
- ✅ Главная лента с бесконечной прокруткой
- ✅ Публичная лента (Explore)
- ✅ Создание постов с загрузкой изображений
- ✅ Профили пользователей
- ✅ Подписка/отписка
- ✅ Защита роутов (middleware)
- ✅ Обработка ошибок и уведомления
- ✅ Скелетоны при загрузке
- ✅ Модальное окно для просмотра постов

## 📝 Лицензия

MIT

