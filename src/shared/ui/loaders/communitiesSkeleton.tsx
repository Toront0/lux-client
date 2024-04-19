const CommunitiesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map(() => (
        <div className="flex items-center gap-2 py-2">
          <div className="min-w-[64px] h-16 rounded-full bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
          <div className="w-full">
            <div className="w-1/3 h-3 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
            <div className="w-1/5 h-3 rounded-sm my-2 bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
            <div className="w-1/6 h-2.5 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommunitiesSkeleton;
