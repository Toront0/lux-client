const SkeletonLoading = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div className="py-1.5">
          <div
            key={i}
            className="w-full h-10 rounded  bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"
          ></div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoading;
