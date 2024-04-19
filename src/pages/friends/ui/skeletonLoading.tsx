const SkeletonLoading = () => {
  return (
    <>
      {Array.from({ length: 10 }).map(() => (
        <div className="flex items-center gap-2 py-2">
          <div className="min-w-[40px] h-10 rounded-full bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
          <div className="w-full">
            <div className="w-1/3 h-3 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
            <div className="w-3/4 h-2.5 mt-2 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
