export const togglePlay = (cb: () => void, videoEl?: HTMLVideoElement) => {
  if (videoEl?.paused) {
    videoEl.play();
    cb();
  } else {
    videoEl?.pause();
    cb();
  }
};
