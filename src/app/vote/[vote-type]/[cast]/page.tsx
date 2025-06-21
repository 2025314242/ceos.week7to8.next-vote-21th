'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Back from '@/components/common/back';
import CandidateGrid from '@/components/features/vote/candidate-grid';
import { getVoteList, vote } from '@/services/api/vote';

export default function VoteStep2() {
  const params = useParams();
  const router = useRouter();
  const [candidates, setCandidates] = useState<{ id: number; name: string }[]>([]);
  const [selectedId, setSelectedId] = useState(-1);

  // front / back / demo
  const type = params['cast'];

  const getTitle = () => {
    if (type === 'front') return 'FE 파트장 투표';
    if (type === 'back') return 'BE 파트장 투표';
    if (type === 'team') return '데모데이 투표';
    return '';
  };

  const voteType = useMemo(() => {
    if (type === 'front') return 'FE_LEADER';
    if (type === 'back') return 'BE_LEADER';
    if (type === 'team') return 'DEMO_DAY';
    return '';
  }, [type]);

  useEffect(() => {
    if (!voteType) return;

    const fetchCandidates = async () => {
      const data = await getVoteList(voteType);

      setCandidates(data);
    };

    fetchCandidates();
  }, [voteType]);

  const handleClick = (id: number) => setSelectedId(id);

  const onSubmit = async () => {
    if (!voteType) return;

    const data = await vote(voteType, selectedId);

    if (data) {
      // 투표 애니메이션 페이지로 이동
      router.push(`/vote/${params['vote-type']}/${type}/aggregate`);
    }
  };

  return (
    <>
      {/* title */}
      <div className="mt-8 mb-15 flex items-center px-8">
        <Back href={`/vote/${params['vote-type']}/list`} />
        <h1 className="text-headline-03 text-grayscale-00-black mx-auto">{getTitle()}</h1>
      </div>
      {/* content */}
      <div>
        <CandidateGrid list={candidates} selectedId={selectedId} handleClick={handleClick} />
        <div className="flex justify-center">
          <button
            onClick={onSubmit}
            className="hover:bg-neutral-01 text-caption-01 bg-grayscale-03 mt-4 h-11.5 w-38.5 cursor-pointer rounded-[100px] border-2"
          >
            제출하기
          </button>
        </div>
      </div>
    </>
  );
}
