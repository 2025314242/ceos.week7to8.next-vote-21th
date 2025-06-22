'use client';

import { useRouter } from 'next/navigation';

type ButtonProps = {
  text1: string;
  text2: string;
  href: string;
  disabled: boolean;
};

export default function GoToVoteButton({ text1, text2, href, disabled }: ButtonProps) {
  const router = useRouter();

  const onResultClick = () => {
    router.push(href + '/result');
  };

  return (
    <div className="relative">
      <div className="border-grayscale-00-black bg-grayscale-04 flex h-39 w-74.5 justify-between border-2">
        <p className="text-headline-04 text-grayscale-00-black mt-8 ml-8 self-baseline">
          {text1}
          <br />
          {text2}
        </p>

        <div className="mr-6 mb-8 grid items-center justify-items-center gap-4 self-end">
          <button
            onClick={() => router.push(href)}
            className="group bg-grayscale-03 hover:bg-neutral-01 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-colors"
          >
            {/* 체크표시: 그룹에 hover되면 등장 */}
            <span className="text-xl font-bold text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
              ✓
            </span>
          </button>
          <button
            onClick={onResultClick}
            className="text-caption-03 bg-grayscale-03 hover:bg-neutral-01 z-20 flex h-9 w-19.5 cursor-pointer items-center justify-center rounded-full border-2 transition-colors"
          >
            결과 보기
          </button>
        </div>
      </div>

      {/* Disabled division */}
      {disabled && (
        <div className="bg-neutral-01 border-grayscale-00-black pointer-events-auto absolute inset-0 z-50 border-2 opacity-70" />
      )}
    </div>
  );
}
