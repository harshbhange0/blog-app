
export default function PostSkeleton() {
  return (
    <div className="flex flex-col gap-2 bg-stone-100/30 p-2 w-full h-auto">
      <div className="w-full flex justify-between">
        <div className="flex gap-2">
          <div className="skeleton rounded-full w-7 h-7 block"></div>
          <div className="w-[200px] skeleton h-full"></div>
        </div>
        <div className="w-[200px] skeleton"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-full h-[40px] skeleton"></div>
        <div className="w-full h-[60px] skeleton"></div>
      </div>
    </div>
  );
}
