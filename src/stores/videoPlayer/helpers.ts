export const getLatestVolumeFromLC = () => {
  const isVideoMuted = window.localStorage.getItem("isVideoMuted");

  if (isVideoMuted && JSON.parse(isVideoMuted) === true) {
    return 0;
  }

  const res = window.localStorage.getItem("lastVideoVolume");

  return res ? +res : 0.2;
};
