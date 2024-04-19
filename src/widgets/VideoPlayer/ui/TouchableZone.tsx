import { useRef, useEffect, useState } from "react";

import { useVideoPlayer } from "../lib/context";

interface ITouchableZone {
  fullScreenEl: HTMLElement;
}

const TouchableZone = ({ fullScreenEl }: ITouchableZone) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [isDblClicked, setIsDblClicked] = useState(false);

  const videoState = useVideoPlayer();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, [isDblClicked]);

  const handleClick = () => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      videoState.togglePlay();
    }, 200);
  };

  return (
    <div
      onClick={handleClick}
      // onClick={() => togglePlay(setIsPaused, videoEl)}
      onDoubleClick={() => {
        videoState.toggleFullscreen(fullScreenEl);
        setIsDblClicked((p) => !p);
      }}
      className="h-full w-full relative"
    >
      {/* <div className="absolute top-1/2 -translate-y-1/2 right-20 w-28 h-28 rounded-full bg-opac-b-8 flex items-center justify-center text-gray-12 flex-col ">
        <div className="flex gap-1">
          <IoMdPlay />
          <IoMdPlay />
          <IoMdPlay />
        </div>
        <span className="text-xs mt-2">5 seconds</span>
      </div> */}
    </div>
  );
};

export default TouchableZone;
