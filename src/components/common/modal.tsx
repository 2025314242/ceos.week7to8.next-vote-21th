'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { logout, me } from '@/services/api/auth';
import type { User } from '@/types/user';

interface LogoutModalProps {
  onClose: () => void;
}

export default function LogoutModal({ onClose }: LogoutModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchId = async () => {
      const userData = await me();

      if (userData) {
        setUser(userData);
      }
    };

    fetchId();
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.push('/'); // 홈으로 이동
  };

  return (
    <div className="bg-accent-dark-tp fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-01 grid h-51.5 w-67 items-center border-2 p-6 shadow-md"
      >
        <div>
          <p className="text-caption-01 mb-7 justify-self-center">{`${user.team} ${user.part === 'FRONTEND' ? 'FE' : user.part === 'BACKEND' ? 'BE' : ''} ${user.name}`}</p>
          <button
            onClick={handleLogout}
            className="text-caption-01 mx-auto block h-11.5 w-38.5 cursor-pointer rounded-full border-2 border-black px-4 py-2 transition hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
