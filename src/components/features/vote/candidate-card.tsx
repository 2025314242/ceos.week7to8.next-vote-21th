export default function CandidateCard({
  id,
  name,
  selectedId,
  handleClick,
}: {
  id: number;
  name: string;
  selectedId: number;
  handleClick: (id: number, name: string) => void;
}) {
  return (
    <button
      onClick={() => handleClick(id, name)}
      className={
        'bg-grayscale-04 text-body-01 hover:bg-neutral-01-tp relative flex h-13.5 cursor-pointer items-center justify-center border-2 border-black transition-colors'
      }
    >
      {name}
      {selectedId === id && (
        <>
          {/* 반투명 레이어 */}
          <div className="bg-neutral-01-tp absolute inset-0 z-10 rounded-sm" />

          {/* 체크 아이콘 */}
          <div className={`bg-neutral-01 top-50% right-50% absolute z-20 h-8.5 w-8.5 rounded-full border-2`}>
            <span className="text-xl font-bold text-gray-700">✓</span>
          </div>
        </>
      )}
    </button>
  );
}
