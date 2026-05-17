# Примеры использования компонентов

## UI компоненты

### Button
```tsx
import { Button } from '@/components/ui';

// Базовая кнопка
<Button>Click me</Button>

// С вариантом
<Button variant="destructive">Delete</Button>

// С loading состоянием
<Button isLoading={isSubmitting}>Submit</Button>

// Варианты: default, destructive, outline, secondary, ghost, link
// Размеры: default, sm, lg, icon
```

### Input
```tsx
import { Input } from '@/components/ui';

<Input 
  placeholder="Enter text..."
  error={errors.email?.message}
/>
```

### Textarea
```tsx
import { Textarea } from '@/components/ui';

<Textarea 
  placeholder="Write a caption..."
  rows={4}
  error={errors.caption?.message}
/>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Select
```tsx
import { Select } from '@/components/ui';

<Select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
  <option value="PUBLIC">Public</option>
  <option value="PRIVATE">Private</option>
</Select>
```

### Avatar
```tsx
import { Avatar } from '@/components/ui';

<Avatar 
  src={user.avatarUrl}
  fallback={user.username[0]}
/>
```

### Skeleton
```tsx
import { Skeleton } from '@/components/ui';

<Skeleton className="w-full h-80" />
```

### Dialog
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

## Хуки

### useAuth
```tsx
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { 
    user,
    isAuthenticated,
    isLoading,
    loginAsync,
    registerAsync,
    logout
  } = useAuth();

  const handleLogin = async () => {
    try {
      await loginAsync({ username: 'john', password: 'pass123' });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
      {isAuthenticated && <p>Welcome, {user?.username}</p>}
      <button onClick={handleLogin}>Login</button>
    </>
  );
};
```

### usePosts (Feed)
```tsx
import { useFeed } from '@/hooks/usePosts';

const MyFeed = () => {
  const { data, isLoading, error } = useFeed(page);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      {data?.data.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
```

### useUserProfile
```tsx
import { useUserProfile } from '@/hooks/useUsers';

const UserProfileComponent = ({ username }) => {
  const { data: profile, isLoading } = useUserProfile(username);

  if (isLoading) return <Skeleton className="h-32 w-32" />;

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.followersCount} followers</p>
    </div>
  );
};
```

### useCreatePost
```tsx
import { useCreatePost } from '@/hooks/usePosts';

const CreatePostForm = () => {
  const { mutate: createPost, isLoading } = useCreatePost();

  const handleSubmit = (data) => {
    createPost(data, {
      onSuccess: () => {
        toast.success('Post created!');
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button type="submit" isLoading={isLoading}>
        Publish
      </Button>
    </form>
  );
};
```

## Компоненты страниц

### Feed (лента постов)
```tsx
import { Feed } from '@/components/Feed';

export default function HomePage() {
  return (
    <div>
      <Header />
      <Feed />
    </div>
  );
}
```

### ExploreGrid (сетка публичных постов)
```tsx
import { ExploreGrid } from '@/components/ExploreGrid';

export default function ExplorePage() {
  return (
    <div>
      <Header />
      <ExploreGrid />
    </div>
  );
}
```

### CreatePostForm
```tsx
import { CreatePostForm } from '@/components/CreatePostForm';

export default function CreatePage() {
  return (
    <div>
      <Header />
      <CreatePostForm />
    </div>
  );
}
```

### UserProfile
```tsx
import { UserProfile } from '@/components/UserProfile';

export default function ProfilePage({ params }) {
  return (
    <div>
      <Header />
      <UserProfile username={params.username} />
    </div>
  );
}
```

## Формы с React Hook Form

### Пример использования в LoginForm
```tsx
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('username', {
          required: 'Username is required',
          minLength: { value: 3, message: 'Min 3 characters' }
        })}
        placeholder="Username"
        error={errors.username?.message}
      />
      <Input
        {...register('password', { required: true })}
        type="password"
        placeholder="Password"
        error={errors.password?.message}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};
```

## Notification (Toast)

```tsx
import { toast } from 'sonner';

// Success
toast.success('Post created successfully!');

// Error
toast.error('Failed to create post');

// Info
toast.info('Loading...');

// Custom
toast.custom((t) => (
  <div>
    Custom notification
    <button onClick={() => toast.dismiss(t)}>Dismiss</button>
  </div>
));
```

## API клиент примеры

```tsx
import { authApi, postsApi, usersApi } from '@/api/client';

// Register
const response = await authApi.register({
  username: 'john',
  password: 'pass123'
});

// Login
const response = await authApi.login({
  username: 'john',
  password: 'pass123'
});

// Get explore feed
const posts = await postsApi.getExplore(1, 20);

// Get home feed
const posts = await postsApi.getFeed(1, 20);

// Create post
const post = await postsApi.create(
  'My caption',
  'PUBLIC',
  fileObject
);

// Get user profile
const user = await usersApi.getProfile('john');

// Follow user
const result = await usersApi.follow('john');

// Unfollow user
const result = await usersApi.unfollow('john');
```

## Обработка ошибок

```tsx
import { getErrorMessage } from '@/utils/errorHandler';

try {
  await someApiCall();
} catch (error) {
  const message = getErrorMessage(error);
  toast.error(message);
}
```

