# Архитектурные заметки

## Поток данных (Data Flow)

### Аутентификация
1. Пользователь вводит credentials в LoginForm
2. useAuth хук отправляет запрос через authApi
3. API перехватчик добавляет Authorization header
4. Бэкенд возвращает { accessToken }
5. Токен сохраняется в localStorage через setTokenToStorage
6. Пользователь редиректится на /home

### Получение постов
1. Страница (home/explore) рендерит компонент Feed/ExploreGrid
2. Компонент использует хук useFeed/useExplore
3. React Query запрашивает данные через postsApi
4. Перехватчик добавляет JWT токен
5. Данные кэшируются в React Query
6. При прокрутке InfiniteScroll триггерит загрузку следующей страницы

### Создание поста
1. CreatePostForm собирает данные (файл, текст, видимость)
2. При отправке преобразует в FormData (multipart/form-data)
3. useCreatePost отправляет запрос
4. Бэкенд возвращает созданный пост
5. Пользователь редиректится на /home

## Защита роутов

Middleware (`src/proxy.ts`) проверяет:
- Protected routes: /home, /create, /profile/me требуют токена
- Auth routes: /login, /register недоступны для авторизованных
- Остальные роуты (explore, /profile/[username]) открыты для всех

## Кэширование и обновление данных

React Query настроен с:
- **staleTime**: 5 минут (данные считаются свеж��ми)
- **cacheTime**: 10 минут (кэш хранится после unmount)
- **retry**: 1 повторная попытка при ошибке

При создании/обновлении используется `invalidateQueries` для очистки кэша.

## Обработка ошибок

1. API перехватчик ��овит ошибки
2. При 401 очищает токен и редиректит на /login
3. Другие ошибки пробрасываются в компоненты
4. Компоненты показывают toast уведомления через sonner

## Работа с Presigned URLs

Бэкенд отправляет временные ссылки для приватных постов (10 минут TTL).
Фронтенд просто рендерит src={post.mediaUrl} без специальной обработки.
Если ссылка протухнет, можно добавить рефетч при ошибке загрузки изображения.

## State Management

- **Global state** (Zustand): Данные текущего пользователя в authStore
- **Server state** (React Query): Посты, профили, ленты
- **Local state** (useState): UI стейт (модалки, формы, пагинация)

## Примеры API запросов

### Login
```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "password123"
}

Response:
{
  "accessToken": "eyJhbGc..."
}
```

### Create Post
```bash
POST http://localhost:8080/api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form fields:
- caption: "My first post!"
- visibility: "PUBLIC"
- file: <image file>
```

### Get Feed
```bash
GET http://localhost:8080/api/posts/feed?page=1&pageSize=20
Authorization: Bearer <token>

Response:
{
  "data": [...posts],
  "hasMore": true,
  "page": 1,
  "pageSize": 20
}
```

## Возможные улучшения

1. **Real-time**: WebSocket для уведомлений о лайках/комментариях
2. **Offline**: IndexedDB для кэширования данных offline
3. **Оптимизация**: Code splitting, image lazy loading
4. **Аналитика**: Tracking user actions
5. **Search**: Поиск по постам и пользователям
6. **Comments**: Добавить систему комментариев
7. **Likes**: Добавить лайки к постам
8. **Dark mode**: Полная поддержка темной темы

## Переменные окружения

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Переменные с префиксом `NEXT_PUBLIC_` доступны в браузере.

