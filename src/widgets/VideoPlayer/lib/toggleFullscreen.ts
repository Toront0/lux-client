export function toggleFullScreen(
  setFullScreen: () => void,
  fullScreenEl?: HTMLElement
) {
  if (!fullScreenEl) return;

  if (!document.fullscreenElement) {
    fullScreenEl.requestFullscreen();
    setFullScreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    setFullScreen();
  }
}
