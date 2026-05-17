'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreatePost } from '@/hooks/usePosts';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Upload, X } from 'lucide-react';
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
      toast.error('Please select an image file');
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
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select an image');
      return;
    }

    if (!caption.trim()) {
      toast.error('Please add a caption');
      return;
    }

    createPost(
      { caption: caption.trim(), visibility, file: selectedFile },
      {
        onSuccess: () => {
          toast.success('Post created successfully');
          router.push('/home');
        },
        onError: (error: any) => {
          const errorMsg = error.response?.data?.error || 'Failed to create post';
          toast.error(errorMsg);
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Share your thoughts with the community</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="text-sm font-medium block mb-2">Upload Image</label>
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
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
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition"
                >
                  <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>

            {/* Caption */}
            <div>
              <label className="text-sm font-medium block mb-2">Caption</label>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption for your post..."
                rows={4}
              />
            </div>

            {/* Visibility */}
            <div>
              <label className="text-sm font-medium block mb-2">Visibility</label>
              <Select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as 'PUBLIC' | 'PRIVATE')}
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private (Followers only)</option>
              </Select>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Publish Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

