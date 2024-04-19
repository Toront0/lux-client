export const getLatestVolumeFromLC = () => {
  const isVideoMuted = window.localStorage.getItem("isMusicMuted");

  if (isVideoMuted && JSON.parse(isVideoMuted) === true) {
    return 0;
  }

  const res = window.localStorage.getItem("lastMusicVolume");

  return res ? +res : 0.2;
};
