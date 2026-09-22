'use client';

import { useEffect, useState } from 'react';
import { subscribeToast } from '@/lib/toast';

interface ActiveToast {
  id: number;
  message: string;
}

let nextId = 1;

export default function Toast() {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);

  useEffect(() => {
    return subscribeToast((message) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          aria-live="polite"
          className="pointer-events-auto bg-[#2C2621] text-[#fff] text-sm font-medium px-4 py-2.5 rounded-full shadow-xl animate-fade-in max-w-sm text-center"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
