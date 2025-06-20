import SelectVoteButton from '@/components/features/vote/select-vote-button';

export default function VoteList() {
  return (
    <>
      {/* title */}
      <div className="mt-16 mb-15 flex justify-center">
        <h1 className="text-headline-03 text-grayscale-00-black">파트장/데모데이 투표</h1>
      </div>
      {/* content */}
      <div className="mb-15 grid h-full items-center">
        <div className="grid gap-10">
          <SelectVoteButton text="파트장 투표" href="/vote/part/list" />
          <SelectVoteButton text="데모데이 투표" href="/vote/demo/list" />
        </div>
      </div>
    </>
  );
}
