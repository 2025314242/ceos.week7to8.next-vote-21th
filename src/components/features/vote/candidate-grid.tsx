'use client';
import React from 'react';

import CandidateCard from './candidate-card';

export default function CandidateGrid({
  list,
  selectedId,
  handleClick,
}: {
  list: { id: number; name: string }[];
  selectedId: number;
  handleClick: (id: number) => void;
}) {
  const columns = list.length <= 5 ? 1 : 2;

  return (
    <div className={`grid grid-rows-5 gap-x-4 gap-y-3 ${columns === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {list.map(({ id, name }, idx) => (
        <CandidateCard key={idx} id={id} name={name} selectedId={selectedId} handleClick={handleClick} />
      ))}
    </div>
  );
}
