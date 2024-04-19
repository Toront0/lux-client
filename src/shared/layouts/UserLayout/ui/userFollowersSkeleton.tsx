const UserFollowersSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex my-4 items-center gap-2">
          <div className="min-w-[40px] h-10 rounded-full bg-opac-b-2 animate-pulse dark:bg-opac-w-2"></div>
          <div className="w-full">
            <div className="w-1/3 h-4 rounded-sm bg-opac-b-2 animate-pulse dark:bg-opac-w-2"></div>
            <div className="w-3/4 h-3 rounded-sm mt-1 bg-opac-b-2 animate-pulse dark:bg-opac-w-2"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserFollowersSkeleton;
