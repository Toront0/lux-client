interface IVideosSkeleton {
  amount?: number;
}

const VideosSkeleton = ({ amount = 5 }: IVideosSkeleton) => {
  return (
    <>
      {Array.from({ length: amount }).map(() => (
        <div className="w-full">
          <div className="w-full aspect-video bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
          <div className="flex gap-2 mt-2">
            <div className="min-w-[36px] h-9 bg-opac-b-2 dark:bg-opac-w-2 rounded-full animate-pulse"></div>
            <div className="w-full">
              <div className="w-full h-3.5 bg-opac-b-2 rounded-sm dark:bg-opac-w-2 animate-pulse"></div>
              <div className="w-1/2 h-3.5 mt-1 bg-opac-b-2 rounded-sm dark:bg-opac-w-2 animate-pulse"></div>
              <div className="w-1/3 h-3 mt-2 bg-opac-b-2 rounded-sm dark:bg-opac-w-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default VideosSkeleton;
