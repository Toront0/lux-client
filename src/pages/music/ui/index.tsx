import PlaylistSlider from "./playlistSlider";
import InfiniteSongs from "./infiniteSongs";

const MusicPage = () => {
  return (
    <div className="w-full h-full relative flex flex-col overflow-y-auto">
      <PlaylistSlider />
      <div className="relative z-30 flex h-full flex-col">
        <div className="bg-gray-15 dark:bg-black h-full">
          <div className=" max-w-[1440px] px-2 md:px-4 mx-auto">
            <InfiniteSongs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
