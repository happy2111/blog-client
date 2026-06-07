'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreatePost } from '@/hooks/usePosts';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Upload, X, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const CreatePostForm: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createPost, isPending: isLoading } = useCreatePost();

  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState<'PUBLIC' | 'PRIVATE'>('PUBLIC');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Выберите файл изображения');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files[0]) handleFileSelect(files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Прикрепите файл');
      return;
    }

    if (!caption.trim()) {
      toast.error('Укажите название документа');
      return;
    }

    createPost(
      { caption: caption.trim(), visibility, file: selectedFile },
      {
        onSuccess: () => {
          toast.success('Документ успешно создан');
          router.push('/home');
        },
        onError: (error: any) => {
          const errorMsg = error.response?.data?.error || 'Не удалось создать документ';
          toast.error(errorMsg);
        },
      }
    );
  };

  return (
    <div className="max-w-2xl">
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Новый документ</CardTitle>
              <CardDescription>Заполните форму для регистрации документа в системе</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium block mb-2">Название / описание</label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Введите название документа..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Вложение</label>
              {preview ? (
                <div className="relative rounded-lg border border-border overflow-hidden">
                  <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
                  <button
                    type="button"
                    onClick={() => { setSelectedFile(null); setPreview(null); }}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition"
                >
                  <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium text-sm">Перетащите файл или нажмите для загрузки</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF до 10 МБ</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
                className="hidden"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Уровень доступа</label>
              <Select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as 'PUBLIC' | 'PRIVATE')}
              >
                <option value="PUBLIC">Открытый — виден всем</option>
                <option value="PRIVATE">Конфиденциальный — только для контактов</option>
              </Select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
                Отмена
              </Button>
              <Button type="submit" className="flex-1" isLoading={isLoading}>
                Сохранить документ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
