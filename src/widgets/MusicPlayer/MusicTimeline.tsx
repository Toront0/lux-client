import { useRef, MouseEvent } from "react";

import { clamp, formatTimeDuration } from "@/shared";
import { useMusicState } from "@/stores";

const MusicTimeline = () => {
  const { currentTime, musicRef } = useMusicState(["currentTime", "musicRef"]);
  const timeLineRef = useRef<HTMLDivElement>();

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = timeLineRef.current?.getBoundingClientRect();
    if (!rect) return;

    const percent = clamp(0, rect.width, e.pageX - rect.x) / rect.width;

    if (!musicRef) return;

    musicRef.currentTime = musicRef.duration * percent;
  };

  return (
    <div className="flex items-center  justify-center h-full gap-4">
      <span className="text-gray-5 dark:text-gray-10 text-xs w-10 flex  justify-center ">
        {formatTimeDuration(currentTime)}
      </span>
      <div
        onClick={handleOnClick}
        ref={timeLineRef as React.RefObject<HTMLDivElement>}
        className="rounded w-full cursor-pointer h-1 overflow-hidden bg-opac-b-3 dark:bg-opac-w-2 relative"
      >
        <div
          style={{
            width: (currentTime / (musicRef?.duration || 0)) * 100 + "%"
          }}
          className="absolute top-0 overflow-hidden  bg-black dark:bg-white rounded h-full"
        ></div>
      </div>
      <span className="text-gray-5 dark:text-gray-10 text-xs w-10 flex justify-center ">
        {musicRef?.duration
          ? formatTimeDuration(musicRef.duration - currentTime)
          : "0:00"}
      </span>
    </div>
  );
};

export default MusicTimeline;
