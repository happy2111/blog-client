'use client';

import * as React from 'react';
import { User } from 'lucide-react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, alt = '', fallback = '?', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    if (!src || imageError) {
      return (
        <div
          ref={ref}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold ${className}`}
          {...props}
        >
          {fallback ? fallback[0].toUpperCase() : <User className="h-5 w-5" />}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-muted ${className}`}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };

