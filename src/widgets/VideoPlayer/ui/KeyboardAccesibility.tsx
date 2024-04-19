import { MutableRefObject, useEffect } from "react";

import { useVideoPlayer } from "../lib/context";

interface IKeyboardAccesibility {
  children: React.ReactNode;
  fullScreenEl: MutableRefObject<HTMLDivElement | undefined>;
  disable?: boolean;
}

const KeyboardAccesibility = ({
  children,
  fullScreenEl,
  disable
}: IKeyboardAccesibility) => {
  const videoState = useVideoPlayer();

  useEffect(() => {
    if (disable) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "k") {
        videoState.togglePlay();
      }

      if (e.key === "f") {
        if (fullScreenEl.current) {
          videoState.toggleFullscreen(fullScreenEl.current);
        }
      }

      if (e.key === "ArrowRight") {
        videoState.skipTimeTo(5);
      }

      if (e.key === "ArrowLeft") {
        videoState.skipTimeTo(-5);
      }

      console.log("key pressed: ", e);
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [fullScreenEl.current]);

  return <>{children}</>;
};

export default KeyboardAccesibility;
