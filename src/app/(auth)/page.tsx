'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

import Button from '@/components/features/auth/button';
import { useAuthStore } from '@/lib/store/use-auth-store';
import VoteIcon from '@/public/icons/vote.svg';

export default function Landing() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isHydrated, setHydrated] = useState(false);

  const user = useAuthStore((state) => state.user);
  const id = user?.id;

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');

    if (refreshToken && !!user) {
      setLoggedIn(true);
    }

    setHydrated(true);
  }, [user]);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex h-full flex-col px-10">
      <div className="flex flex-grow">
        {isLoggedIn ? (
          <>
            <div className="relative flex-[7]">
              <p className="text-headline-01 text-grayscale-00-black absolute top-1/4 text-shadow-[4px_6px_8px_rgba(0,0,0,0.25)]">
                WELCOME {id}
              </p>
            </div>
            <div className="relative flex-[5]">
              <VoteIcon className="text-grayscale-00-black-tp absolute top-2/5 drop-shadow-[4px_6px_8px_rgba(0,0,0,0.25)]" />
            </div>
          </>
        ) : (
          <>
            <div className="relative flex-[5]">
              <VoteIcon className="text-grayscale-00-black absolute top-2/5 drop-shadow-[4px_6px_8px_rgba(0,0,0,0.25)]" />
            </div>
            <div className="relative flex-[7]">
              <p className="text-headline-01 text-grayscale-00-black absolute top-1/4 text-shadow-[4px_6px_8px_rgba(0,0,0,0.25)]">
                CEOS Election
              </p>
            </div>
          </>
        )}
      </div>
      <div className="absolute inset-x-10 top-3/4">
        {isLoggedIn ? (
          <Button href="/vote/list" text="Start" />
        ) : (
          <>
            <Button href="/login" text="Join us" />
            <Link href="/sign-up">
              <div className="mt-[14px] flex justify-center">
                <p className="text-caption-04 text-grayscale-00-black cursor-pointer underline">Sign up as a member</p>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
