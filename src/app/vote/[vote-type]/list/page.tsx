'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Back from '@/components/common/back';
import GoToVoteButton from '@/components/features/vote/go-to-vote-button';
import { me } from '@/services/api/auth';

export default function VoteStep1() {
  const params = useParams();
  const [part, setPart] = useState('');

  const type = params['vote-type'];

  useEffect(() => {
    const fetchPart = async () => {
      const userData = await me();
      const partData = userData?.part;

      if (partData) {
        setPart(partData);
      }
    };

    fetchPart();
  });

  return (
    <>
      {/* title */}
      <div className="mt-8 mb-15 flex items-center px-8">
        <Back href="/vote/list" />
        <h1 className="text-headline-03 text-grayscale-00-black mx-auto">
          {type === 'part' ? '파트장 투표' : '데모데이 투표'}
        </h1>
      </div>
      {/* content */}
      {type === 'part' ? (
        <div className="mb-15 grid h-full items-center">
          <div className="grid gap-10">
            <GoToVoteButton
              text1="Front-End"
              text2="파트장 투표"
              href="/vote/part/front"
              disabled={part !== 'FRONTEND'}
            />
            <GoToVoteButton text1="Back-End" text2="파트장 투표" href="/vote/part/back" disabled={part !== 'BACKEND'} />
          </div>
        </div>
      ) : (
        <div className="mb-15 grid h-full items-center">
          <GoToVoteButton text1="데모데이 투표" text2="" href="/vote/demo/team" disabled={false} />
        </div>
      )}
    </>
  );
}
