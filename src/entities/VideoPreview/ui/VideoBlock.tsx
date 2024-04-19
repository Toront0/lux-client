import { formatTimeDuration } from "@/shared";
import React, { useEffect, useRef, useState } from "react";

interface IVideoBlock {
  url: string;
  thumbnail: string;
  title: string;
}

const isThumnailDefault = (url: string) => {
  if (url.includes("/social-media/defaults")) {
    return true;
  } else {
    return false;
  }
};

const VideoBlock = ({ url, thumbnail, title }: IVideoBlock) => {
  const [duration, setDuration] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        if (isHovered) {
          setShouldPlayVideo(true);
          videoRef.current?.play();
        }
      }, 500);

      return () => {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
        setShouldPlayVideo(false);
        videoRef.current?.pause();
      };
    }
  }, [isHovered]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full aspect-video   relative ${
        shouldPlayVideo ? "" : "rounded hover:brightness-75"
      } bg-gray-12 dark:bg-gray-4`}
    >
      {duration !== null && (
        <div className="absolute bottom-1.5 right-1.5 z-20 px-2 py-1 rounded bg-opac-b-12 text-gray-12 text-xs">
          {formatTimeDuration(duration)}
        </div>
      )}
      {isThumnailDefault(thumbnail) && (
        <div className="w-[calc(100%+2px)] h-[calc(100%+2px)] z-10 absolute bg-gray-12 dark:bg-gray-4">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <video
        muted
        src={url}
        className={`w-full h-full relative ${
          shouldPlayVideo ? "z-20" : "z-0"
        } object-cover`}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
        ref={videoRef as React.RefObject<HTMLVideoElement>}
      />
    </div>
  );
};

export default VideoBlock;
