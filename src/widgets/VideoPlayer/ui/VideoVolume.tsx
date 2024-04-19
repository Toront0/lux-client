import { FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";

import { useVideoPlayer } from "../lib/context";

const VideoVolume = () => {
  const videoState = useVideoPlayer();

  return (
    <div className="hidden md:flex items-center gap-2">
      <button onClick={videoState.muteVideo} className="text-lg">
        {videoState.currentVolume < 1 ? (
          <FaVolumeMute />
        ) : videoState.currentVolume <= 50 ? (
          <FaVolumeDown />
        ) : (
          <FaVolumeUp />
        )}
      </button>
      <div className="w-28 h-0.5 relative">
        <div
          style={{ left: videoState.currentVolume * 0.86 + "%" }}
          className="w-4 h-4 rounded-full bg-white absolute top-1/2 -translate-y-1/2"
        ></div>
        <div className="flex   h-1 gap-2">
          <div className="relative  w-32 h-0.5 bg-opac-w-2">
            <div
              style={{
                width: videoState.currentVolume + "%"
              }}
              className="h-full absolute top-0 left-0 bg-white rounded"
            ></div>
            <input
              type="range"
              name="music-volume"
              value={videoState.currentVolume}
              onChange={(e) => videoState.setCurrVolume(+e.target.value)}
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

export default VideoVolume;
