'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenFromStorage } from '@/api/client';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      router.push('/home');
    } else {
      router.push('/explore');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
