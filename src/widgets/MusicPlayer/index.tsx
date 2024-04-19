import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import VolumeInput from "./VolumeInput";

import { BiSkipNext } from "react-icons/bi";
import { useMusicState } from "@/stores";
import MusicTimeline from "./MusicTimeline";

const MusicPlayer = () => {
  const { musicTitle, musicPerformer, isPaused, setIsPaused } = useMusicState([
    "musicTitle",
    "musicPerformer",
    "setIsPaused",
    "isPaused"
  ]);

  return (
    <div className="relative w-full ">
      {/* <MusicCanvas key={theme.activeTheme} /> */}
      <div className="w-full relative  z-30 pt-8">
        <MusicTimeline />
        <div className="flex items-center mt-2 justify-between ">
          <div className="text-gray-4 w-1/3 text-xs md:text-sm dark:text-gray-12">
            <h4>{musicTitle}</h4>
            <h4>{musicPerformer}</h4>
          </div>
          <div className="w-1/3 flex justify-center gap-4">
            <button
              // disabled={activeSongIndex === undefined}
              // onClick={setPreviousSong}
              className="cursor-pointer text-gray-12 disabled:text-gray-6 "
            >
              <BiSkipNext className="text-3xl  rotate-180" />
            </button>
            <button
              onClick={setIsPaused}
              className="w-12 h-12 border border-opac-b-1 dark:border-opac-w-1 active:scale-95 transition-transform rounded-full bg-gradient-to-t from-purple-7 via-purple-7 to-purple-8 shadow-elev-3 dark:from-purple-4 dark:via-purple-5 dark:to-purple-6 text-white flex items-center justify-center"
            >
              {isPaused ? (
                <BsFillPlayFill className="text-3xl text-gray-12" />
              ) : (
                <BsPauseFill className="text-3xl text-gray-12" />
              )}
            </button>
            <button
              // disabled={activeSongIndex === undefined}
              // onClick={setNextSong}
              className="cursor-pointer text-gray-12 disabled:text-gray-6 "
            >
              <BiSkipNext className="text-3xl " />
            </button>
          </div>
          <div className=" w-1/3 mr-6">
            <VolumeInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
