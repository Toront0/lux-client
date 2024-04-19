import React, { useEffect, useRef, useState } from "react";
import { useVideoPlayer } from "../lib/context";
import VideoTimeline from "./VideoTimeline";
import TouchableZone from "./TouchableZone";
import KeyboardAccesibility from "./KeyboardAccesibility";
import { useVideoPlayerState } from "@/stores/videoPlayer/videoPlayerStore";

interface IVideoPlayerContainer {
  url: string;
  videoId: number;
}

const VideoPlayerContainer = ({ url, videoId }: IVideoPlayerContainer) => {
  const fullScreenElRef = useRef<HTMLDivElement>();
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>();

  const videoState = useVideoPlayer();
  const [currentTime, setCurrentTime] = useState(0);

  const globalVideoState = useVideoPlayerState();

  useEffect(() => {
    if (globalVideoState.currentUrl !== url) {
      videoState.videoEl?.current?.pause();
      videoRef.current && videoState.initVideoEl(videoRef.current);
    }
  }, [globalVideoState.currentUrl, videoRef.current]);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={fullScreenElRef as React.RefObject<HTMLDivElement>}
      className="w-full overflow-hidden relative bg-black select-none rounded h-full"
    >
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement>}
        src={url}
        className="w-full  h-full object-contain"
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
        crossOrigin="anonymous"
      ></video>
      {isHover && (
        <div className="absolute  bottom-0 left-0 right-0 w-full h-1/2 bg-gradient-to-t from-black via-opac-b-2 to-transparent"></div>
      )}

      <div className="absolute inset-0  w-full h-full flex flex-col ">
        {videoState.videoEl?.current && fullScreenElRef.current && (
          <KeyboardAccesibility fullScreenEl={fullScreenElRef} disable>
            <TouchableZone fullScreenEl={fullScreenElRef.current} />

            <VideoTimeline
              isHovered={isHover}
              fullScreenEl={fullScreenElRef.current}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              videoId={videoId}
              url={url}
            />
          </KeyboardAccesibility>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerContainer;
