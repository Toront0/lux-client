const SongsLoader = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center w-full h-10 mb-2 rounded bg-opac-b-2 dark:bg-opac-w-2 animate-pulse"
        ></div>
      ))}
    </>
  );
};

export default SongsLoader;
