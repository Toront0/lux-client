import { useMusicState } from "@/stores";
import { useState } from "react";

import { FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";

const VolumeInput = () => {
  const [showCurrentVolumeBadge, setShowCurrentVolumeBadge] = useState(false);
  const { currentVolume, setCurrentVolume, muteMusic } = useMusicState([
    "currentVolume",
    "setCurrentVolume",
    "muteMusic"
  ]);

  return (
    <div className="hidden md:flex items-center justify-end gap-2 w-full">
      <button
        onClick={muteMusic}
        className="text-lg text-black dark:text-white"
      >
        {currentVolume < 1 ? (
          <FaVolumeMute />
        ) : currentVolume <= 50 ? (
          <FaVolumeDown />
        ) : (
          <FaVolumeUp />
        )}
      </button>
      <div className=" w-28 h-0.5   relative">
        <div
          style={{ left: currentVolume * 0.86 + "%" }}
          className="w-4 h-4 rounded-full bg-black dark:bg-white absolute top-1/2 -translate-y-1/2"
        >
          {showCurrentVolumeBadge && (
            <div
              className={`absolute bottom-full will-change-auto mb-2 border z-30 left-1/2 -translate-x-1/2 border-gray-11 dark:border-gray-5 rounded `}
            >
              <div
                className={`relative shadow-elev-2 dark:shadow-elev-2-dark rounded`}
              >
                <div
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-2 border-gray-11 dark:border-gray-5  border  rotate-45`}
                ></div>
                <div
                  className={`relative px-2 py-0.5  rounded text-sm font-medium text-gray-4 dark:text-gray-12 bg-white dark:bg-gray-2  z-10`}
                >
                  {currentVolume + "%"}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex   h-1 gap-2">
          <div className="relative  w-32 h-0.5 bg-opac-b-2 dark:bg-opac-w-2">
            <div
              style={{
                width: currentVolume + "%"
              }}
              className="h-full absolute top-0 left-0 bg-black dark:bg-white rounded"
            ></div>
            <input
              type="range"
              name="music-volume"
              value={currentVolume}
              onChange={setCurrentVolume}
              onMouseDown={() => setShowCurrentVolumeBadge(true)}
              onMouseUp={() => setShowCurrentVolumeBadge(false)}
              max={100}
              min={0}
              step={1}
              id="music-volume"
              className="bg-white absolute top-0 w-full h-full left-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeInput;
