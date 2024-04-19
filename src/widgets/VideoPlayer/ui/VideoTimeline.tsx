import { useRef, Dispatch, SetStateAction, MouseEvent } from "react";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";

import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";

import { clamp, formatTimeDuration } from "@/shared";

import VideoVolume from "./VideoVolume";
import VideoSettings from "./VideoSettings/VideoSettings";

import { useVideoPlayer } from "../lib/context";
import { useVideoPlayerState } from "@/stores/videoPlayer/videoPlayerStore";

interface IVideoTimeline {
  videoId: number;
  isHovered: boolean;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  fullScreenEl: HTMLElement;
  url: string;
}

const VideoTimeline = ({
  fullScreenEl,

  url,
  currentTime
}: IVideoTimeline) => {
  const timeLineRef = useRef<HTMLDivElement>();
  const videoState = useVideoPlayer();
  const videoState2 = useVideoPlayerState();

  const calculateCurrentTime = (e: MouseEvent<HTMLDivElement>) => {
    const rect = timeLineRef.current?.getBoundingClientRect();

    if (!rect) return;

    const percent = clamp(0, rect.width, e.pageX - rect.x) / rect.width;

    if (!videoState.videoEl?.current) return;

    videoState.videoEl.current.currentTime =
      percent * videoState.videoEl.current.duration;
  };

  return (
    <div className={`transition-opacity  text-white  w-full p-3`}>
      <div>
        <div className="flex items-center text-sm text-gray-12 mb-1  justify-between">
          <div>{formatTimeDuration(currentTime)}</div>
          <div>
            {videoState.videoEl?.current &&
              formatTimeDuration(
                videoState.videoEl.current.duration - currentTime
              )}
          </div>
        </div>
        <div
          onClick={calculateCurrentTime}
          className="flex h-4 group/timeline cursor-pointer w-full items-center"
        >
          <div
            ref={timeLineRef as React.RefObject<HTMLDivElement>}
            className=" w-full  h-1 group-hover/timeline:scale-y-150 transition-transform overflow-hidden bg-opac-w-2 relative"
          >
            <div
              style={{
                width:
                  (currentTime / (videoState.videoEl?.current?.duration || 0)) *
                    100 +
                  "%"
              }}
              className="absolute top-0  transition-[width]  will-change-transform overflow-hidden bg-white rounded h-full"
            ></div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={videoState.togglePlay}
            className="w-7 h-7 rounded flex items-center justify-center"
          >
            <div className="w-4 h-4">
              {videoState2.currentUrl === url && !videoState.isPaused ? (
                <FaPause className="w-full h-full" />
              ) : (
                <FaPlay className="w-full h-full" />
              )}
            </div>
          </button>
          <VideoVolume />
        </div>
        <div className="flex items-center gap-2">
          <VideoSettings videoEl={videoState.videoEl?.current} />

          <button
            onClick={() => videoState.toggleFullscreen(fullScreenEl)}
            className="w-7 h-7 rounded flex items-center justify-center"
          >
            <div className="w-5 h-5">
              {videoState.isFullScreen ? (
                <BiExitFullscreen className="w-full h-full" />
              ) : (
                <BiFullscreen className="w-full h-full" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTimeline;
