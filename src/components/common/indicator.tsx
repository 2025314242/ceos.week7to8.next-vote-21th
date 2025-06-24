'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LogoutModal from '@/components/common/modal';
import { me } from '@/services/api/auth';

export default function Indicator() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const showLogoutModal = async () => {
    const userData = await me();

    if (userData) {
      setShowLogout(true);
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <div
        onClick={showLogoutModal}
        className="absolute bottom-5 z-999 flex w-full cursor-pointer justify-center gap-2"
      >
        <div className="bg-grayscale-00-black h-3 w-3 rounded-full" />
        <div className="bg-grayscale-00-black h-3 w-3 rounded-full" />
        <div className="bg-grayscale-00-black h-3 w-3 rounded-full" />
      </div>
      {/* 로그아웃 모달 */}
      {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
    </>
  );
}
