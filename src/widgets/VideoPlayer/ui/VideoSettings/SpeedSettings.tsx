import { Dispatch, SetStateAction, useState } from "react";
import { MenuTypes } from "./VideoSettings";

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface ISpeedSettings {
  setCurrentMode: Dispatch<SetStateAction<MenuTypes>>;
  videoEl?: HTMLVideoElement;
}

import { FaCheck } from "react-icons/fa6";
import { playbackSpeed } from "./lib/constants";

const getPlaybackRateFromLC = () => {
  const res = window.localStorage.getItem("playbackRate");

  return res ? +res : 1;
};

const SpeedSettings = ({ setCurrentMode, videoEl }: ISpeedSettings) => {
  const [currPlaybackRate, setCurrPlaybackRate] = useState(() =>
    getPlaybackRateFromLC()
  );

  const setPlaybackRate = (v: number) => {
    if (!videoEl) return;

    videoEl.playbackRate = v;

    window.localStorage.setItem("playbackRate", String(v));

    setCurrPlaybackRate(v);
  };

  return (
    <div>
      <button
        data-ignore-outside-click
        onClick={() => setCurrentMode("general")}
        className="flex items-center gap-2 text-sm p-1  rounded hover:bg-opac-w-1 w-full text-gray-12 "
      >
        <MdOutlineKeyboardArrowLeft className="text-2xl pointer-events-none" />
        <span className=" pointer-events-none">Playback Speed</span>
      </button>
      <div className="mt-2 pt-2 border-t border-opac-w-2">
        {playbackSpeed.map((v) => (
          <button
            key={v}
            onClick={() => setPlaybackRate(v)}
            className="flex items-center w-full justify-between hover:bg-opac-w-1 px-2 py-1.5 rounded"
          >
            <div className="flex items-center gap-2 text-sm">{v}</div>
            {v === currPlaybackRate && <FaCheck className="text-lg" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpeedSettings;
