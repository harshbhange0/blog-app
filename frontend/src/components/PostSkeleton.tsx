export default function PostSkeleton() {
  return (
    <div className="flex h-auto w-full flex-col gap-2 bg-stone-100/30 p-2">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          <div className="skeleton block h-7 w-7 rounded-full"></div>
        </div>
        <div className="skeleton w-[200px]"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="skeleton h-[40px] w-full"></div>
        <div className="skeleton h-[50px] w-full"></div>
        <div className="skeleton h-[40px] w-full"></div>
      </div>
    </div>
  );
}
