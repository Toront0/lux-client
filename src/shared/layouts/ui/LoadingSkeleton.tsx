const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full  h-1/5 md:h-1/4 bg-gray-14 dark:bg-gray-1 "></div>
      <div className="px-2 md:px-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-gray-12 -mt-16 relative z-10 dark:bg-gray-2 animate-pulse"></div>
        <div className="w-72 mt-2 h-6 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"></div>
        <div className="w-1/3 h-4 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse mt-6"></div>
        <div className="w-1/3 h-4 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse mt-2"></div>
        <div className="w-1/4 h-4 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 animate-pulse mt-2"></div>
        <div className="flex gap-4 w-full mt-12 justify-center animate-pulse">
          <div className="w-20 h-5 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 "></div>
          <div className="w-20 h-5 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 "></div>
          <div className="w-20 h-5 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 "></div>
          <div className="w-20 h-5 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 "></div>
          <div className="w-20 h-5 rounded-sm bg-opac-b-2 dark:bg-opac-w-2 "></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
