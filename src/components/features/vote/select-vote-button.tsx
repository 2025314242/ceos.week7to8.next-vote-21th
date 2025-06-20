'use client';

import { useRouter } from 'next/navigation';

type ButtonProps = {
  text: string;
  href: string;
};

export default function SelectVoteButton({ text, href }: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href); // 페이지 이동
  };

  return (
    <div className="border-grayscale-00-black bg-grayscale-04 flex h-24 w-74.5 items-center justify-between border-2">
      <p className="text-headline-04 text-grayscale-00-black ml-10">{text}</p>
      <button
        className="bg-grayscale-03 group hover:bg-neutral-01 mr-10 h-10 w-10 cursor-pointer rounded-full border-2 transition-colors"
        onClick={handleClick}
      >
        <span className="text-xl font-bold text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">✓</span>
      </button>
    </div>
  );
}
