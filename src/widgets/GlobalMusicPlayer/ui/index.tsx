import { useMusicState } from "@/stores";

import React, { useEffect, useRef } from "react";

import { FaPause, FaPlay } from "react-icons/fa";

const GlobalMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>();

  const {
    musicRef,
    initMusicRef,
    musicUrl,
    setCurrentTime,
    tryToGetNextSong,
    setIsPaused,
    musicTitle,
    musicPerformer,
    isPaused
  } = useMusicState([
    "musicRef",
    "initMusicRef",
    "musicUrl",
    "setCurrentTime",
    "tryToGetNextSong",
    "setIsPaused",
    "musicTitle",
    "musicPerformer",
    "isPaused"
  ]);

  useEffect(() => {
    if (!musicRef && audioRef.current) {
      audioRef.current.volume = 0.1;
      initMusicRef(audioRef.current);
    }
  }, [audioRef]);

  return (
    <div className="fixed top-3 left-1/2 z-10 w-64 md:w-96 -translate-x-1/2">
      {musicUrl && (
        <div className="flex items-center gap-2">
          <button
            onClick={setIsPaused}
            className="w-6 h-6 text-xs rounded-full text-gray-4 dark:text-gray-12 flex items-center justify-center bg-opac-b-2 dark:bg-opac-w-2"
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </button>
          <div>
            <h3 className="text-xs text-gray-6 dark:text-gray-9">
              {musicPerformer} - {musicTitle}
            </h3>
          </div>
        </div>
      )}
      <audio
        ref={audioRef as React.RefObject<HTMLAudioElement>}
        src={musicUrl}
        crossOrigin="anonymous"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        autoPlay
        onEnded={tryToGetNextSong}
      ></audio>
    </div>
  );
};

export default GlobalMusicPlayer;
