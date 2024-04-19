import { ChangeEvent, Dispatch, SetStateAction } from "react";

type setCurrentVolume = Dispatch<SetStateAction<number>>;

export const muteVideo = (
  setCurrentVolume: setCurrentVolume,
  currentVolume: number,
  videoEl?: HTMLVideoElement
) => {
  if (!videoEl) return;

  if (currentVolume > 0) {
    window.localStorage.setItem("isVideoMuted", "true");
    window.localStorage.setItem("lastVideoVolume", String(currentVolume));
    setCurrentVolume(0);
    videoEl.volume = 0;
  } else {
    window.localStorage.setItem("isVideoMuted", "false");

    const vol = window.localStorage.getItem("lastVideoVolume");

    const lastVol = vol ? +vol : 20;

    videoEl.volume = lastVol / 100;

    setCurrentVolume(lastVol);
  }
};

export const changeVolume = (
  e: ChangeEvent<HTMLInputElement>,
  setCurrentVolume: setCurrentVolume,
  videoEl?: HTMLVideoElement
) => {
  if (!videoEl) return;

  if (+e.target.value > 0) {
    window.localStorage.setItem("isVideoMuted", "false");
  } else {
    window.localStorage.setItem("isVideoMuted", "true");
  }

  videoEl.volume = +e.target.value / 100;

  window.localStorage.setItem("lastVideoVolume", e.target.value);

  setCurrentVolume(+e.target.value);
};

export const getLatestVolumeFromLC = () => {
  const isVideoMuted = window.localStorage.getItem("isVideoMuted");

  if (isVideoMuted && JSON.parse(isVideoMuted) === true) {
    return 0;
  }

  const res = window.localStorage.getItem("lastVideoVolume");

  return res ? +res : 0.2;
};
