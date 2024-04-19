import {
  createContext,
  useState,
  useContext,
  useRef,
  MutableRefObject,
  useEffect
} from "react";
import { getLatestVolumeFromLC } from "./volume";
import { useVideoPlayerState } from "@/stores/videoPlayer/videoPlayerStore";

type VideoPlayerType = {
  videoEl?: MutableRefObject<HTMLVideoElement | undefined>;
  initVideoEl: (el: HTMLVideoElement) => void;
  fullScreenElRef?: HTMLDivElement;
  initFullScreenEl: (el: HTMLDivElement) => void;
  isPaused: boolean;
  togglePlay: () => void;
  isFullScreen: boolean;
  toggleFullscreen: (fullScreenEl: HTMLElement) => void;
  muteVideo: () => void;
  currentVolume: number;
  setCurrVolume: (v: number) => void;
  setCurrentTime: (v: number) => void;
  skipTimeTo: (v: number) => void;
};

export const VideoPlayer = createContext({} as VideoPlayerType);

export default function VideoPlayerProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isPaused, setIsPaused] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(getLatestVolumeFromLC());
  const videoEl = useRef<HTMLVideoElement>();
  const fullScreenEl = useRef<HTMLDivElement>();

  useEffect(() => {
    if (videoEl.current) {
      videoEl.current.volume = getLatestVolumeFromLC() / 100;
    }
  }, [videoEl]);

  const togglePlay = () => {
    if (!videoEl.current) return;

    if (useVideoPlayerState.getState().currentUrl !== videoEl.current.src) {
      useVideoPlayerState.getState().setCurrentUrl(videoEl.current.currentSrc);
    }

    if (videoEl.current.paused) {
      videoEl.current.play();

      setIsPaused(false);
    } else {
      videoEl.current.pause();
      setIsPaused(true);
    }
  };

  const initFullScreenEl = (el: HTMLDivElement) => {
    fullScreenEl.current = el;
  };

  const toggleFullscreen = (el: HTMLElement) => {
    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const initVideoEl = (el: HTMLVideoElement) => {
    el.volume = getLatestVolumeFromLC() / 100;

    videoEl.current = el;
  };

  const muteVideo = () => {
    if (currentVolume > 0) {
      window.localStorage.setItem("isVideoMuted", "true");
      window.localStorage.setItem("lastVideoVolume", String(currentVolume));
      if (!videoEl.current) return;
      videoEl.current.volume = 0;

      setCurrentVolume(0);
    } else {
      window.localStorage.setItem("isVideoMuted", "false");

      const vol = window.localStorage.getItem("lastVideoVolume");

      const lastVol = vol ? +vol : 20;

      if (!videoEl.current) return;
      videoEl.current.volume = lastVol / 100;

      setCurrentVolume(lastVol);
    }
  };

  const setCurrVolume = (v: number) => {
    if (v > 0) {
      window.localStorage.setItem("isVideoMuted", "false");
    } else {
      window.localStorage.setItem("isVideoMuted", "true");
    }

    if (!videoEl.current) return;

    videoEl.current.volume = v / 100;

    window.localStorage.setItem("lastVideoVolume", String(v));

    setCurrentVolume(v);
  };

  const setCurrentTime = (v: number) => {
    if (!videoEl.current) return;

    videoEl.current.currentTime = v;
  };

  const skipTimeTo = (v: number) => {
    if (!videoEl.current) return;
    videoEl.current.currentTime += v;
  };

  return (
    <VideoPlayer.Provider
      value={{
        videoEl,
        isPaused,
        isFullScreen,
        currentVolume,
        toggleFullscreen,
        togglePlay,
        muteVideo,
        skipTimeTo,
        setCurrVolume,
        setCurrentTime,
        initVideoEl,
        initFullScreenEl
      }}
    >
      {children}
    </VideoPlayer.Provider>
  );
}

export const useVideoPlayer = () => {
  const ctx = useContext(VideoPlayer);

  if (!ctx) {
    throw new Error("useVideoPlayert must be used in the VideoPlayerProvider");
  }

  return ctx;
};
