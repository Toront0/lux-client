import { useState, forwardRef, useRef, SyntheticEvent } from "react";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";

import { formatTimeDuration } from "@/shared";

import { useMusicState } from "@/stores";

import { SongType } from "../config/types";

import DeleteSongFromUserListButton from "./DeleteSongFromUserListButton";
import AddSongToUserListButton from "./AddSongToUserListButton";

interface ISongType extends SongType {
  idx: number;
}

const Song = forwardRef(
  (
    {
      id,
      title,
      cover,
      performer,
      idx,
      url,

      isInMyList
    }: ISongType,
    ref
  ) => {
    const musicRef = useRef<HTMLAudioElement>();
    const [songDuration, setSongDuration] = useState<number | null>(null);

    const {
      activeSongIndex,
      getMusicInfo,
      playSong,
      setIsPaused,
      setActiveSongIndex,
      musicUrl,
      isPaused
    } = useMusicState([
      "activeSongIndex",
      "getMusicInfo",
      "playSong",
      "setActiveSongIndex",
      "musicUrl",
      "isPaused",
      "setIsPaused"
    ]);

    const testPlay = () => {
      if (url !== musicUrl) {
        setActiveSongIndex(idx);

        getMusicInfo(url, title, cover, performer);
      }

      if (activeSongIndex !== idx) {
        playSong();
      } else {
        setIsPaused();
      }
    };

    const initSongDuration = (e: SyntheticEvent<HTMLAudioElement>) => {
      setSongDuration(e.currentTarget.duration);
    };

    return (
      <div
        // onClick={testPlay}
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`w-full ${
          idx !== 0 && "mt-2"
        } h-12 rounded group  justify-between cursor-pointer p-2 flex items-center ${
          musicUrl === url
            ? "bg-opac-b-1 dark:bg-opac-w-1"
            : "hover:bg-opac-b-1 dark:hover:bg-opac-w-1"
        }`}
      >
        <audio
          src={url}
          ref={musicRef as React.RefObject<HTMLAudioElement>}
          onLoadedData={initSongDuration}
          preload="metadata"
        />
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 w-4  `}>
            {musicUrl === url ? (
              <button
                onClick={testPlay}
                className={`text-xl  text-gray-4 dark:text-gray-12`}
              >
                {isPaused ? <BsFillPlayFill /> : <BsPauseFill />}
              </button>
            ) : (
              <>
                <button
                  onClick={testPlay}
                  className={`text-xl hidden group-hover:block text-gray-4 dark:text-gray-12`}
                >
                  <BsFillPlayFill />
                </button>
                <span className="text-gray-6 block group-hover:hidden text-center w-full text-sm dark:text-gray-9 font-medium">
                  {idx + 1}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 relative dark:bg-gray-3 rounded bg-gray-13  z-20">
              <img
                src={cover}
                alt={title}
                className={`w-full h-full  ${
                  musicUrl === url ? " brightness-50" : "brightness-100"
                } rounded object-cover`}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-2 dark:text-gray-15">
                {title}
              </h3>
              <h4 className="text-xs text-gray-7 dark:text-gray-10 mt-0.5">
                {performer}
              </h4>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isInMyList ? (
            <DeleteSongFromUserListButton songId={id} />
          ) : (
            <AddSongToUserListButton songId={id} />
          )}

          <span className="text-gray-6 dark:text-gray-8 text-xs">
            {songDuration && formatTimeDuration(songDuration)}
          </span>
        </div>
      </div>
    );
  }
);

export default Song;
