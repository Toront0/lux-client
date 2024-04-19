import { useState } from "react";
import { SlSettings } from "react-icons/sl";

export type MenuTypes = "general" | "speed";

import GeneralSettings from "./GeneralSettings";
import SpeedSettings from "./SpeedSettings";

import { useOutsideClick } from "@/shared/hooks";

interface IVideoSettings {
  videoEl?: HTMLVideoElement;
}

const VideoSettings = ({ videoEl }: IVideoSettings) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [currentMode, setCurrentMode] = useState<MenuTypes>("general");

  const ref = useOutsideClick(() => setIsMenuExpanded(false));

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      <button
        onClick={() => setIsMenuExpanded((p) => !p)}
        className="w-4 h-4 flex items-center"
      >
        <SlSettings className="w-full h-full" />
      </button>

      {isMenuExpanded && (
        <div className="absolute bottom-full shadow-elev-3-dark right-0 mb-2 p-2 border-opac-w-2  w-64 rounded border z-30 bg-gray-1">
          {currentMode === "general" ? (
            <GeneralSettings
              onClose={() => setIsMenuExpanded(false)}
              setCurrentMode={setCurrentMode}
            />
          ) : (
            <SpeedSettings setCurrentMode={setCurrentMode} videoEl={videoEl} />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoSettings;
