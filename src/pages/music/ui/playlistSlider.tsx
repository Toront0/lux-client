import { reactQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { IoPlay } from "react-icons/io5";

import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { changeSlide } from "../lib/sliderMovement";

import { useInterval } from "../lib/useInterval";
import { getPlaylists } from "../api/getPlaylists";
import { Link } from "react-router-dom";

const PlaylistSlider = () => {
  const [activeSlide, setAcitveSlide] = useState(0);

  const { data } = useQuery({
    queryKey: [reactQueryKeys.playlists],
    queryFn: getPlaylists
  });

  useInterval(() => changeSlide(setAcitveSlide, data?.length || 0, "next"));
  if (!data) return null;

  return (
    <div className="w-full h-full">
      {data.map((v, i) => (
        <div
          key={v.id}
          className={`absolute overflow-hidden ${
            i === activeSlide ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000 top-0 left-0 w-full h-full`}
        >
          {i === activeSlide && (
            <img
              src={v.coverImg}
              alt={v.title}
              className=" object-cover w-full h-full"
            />
          )}
        </div>
      ))}
      <div className="relative pt-[100%] w-full h-full  md:pt-[30%]">
        <div className="absolute top-1/2  z-20 -translate-y-1/2 w-full">
          <div className="max-w-[1440px] mx-auto w-full px-2 md:px-4 gap-1 flex items-end flex-col">
            {data.map((v, i) => (
              <div
                key={v.id}
                className={`w-0.5 h-8 rounded ${
                  i === activeSlide
                    ? "bg-gray-4 dark:bg-gray-12"
                    : "bg-opac-b-4 dark:bg-opac-w-4"
                } `}
              ></div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-t from-gray-15 dark:from-black via-opac-w-10 dark:via-opac-b-10 to-transparent w-full h-full absolute bottom-0 left-0 right-0 z-10"></div>
        <div className="flex justify-between relative z-20 items-center max-w-[1440px] px-2 md:px-4 mx-auto">
          <div className="">
            <h2 className="text-3xl md:text-5xl leading-5    font-bold text-black dark:text-white">
              {data[activeSlide].title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                changeSlide(setAcitveSlide, data.length, "previous")
              }
              className="text-3xl md:text-4xl"
            >
              <RiArrowLeftSLine />
            </button>
            <Link
              to={`/${data[activeSlide].creatorId}/music/playlists/${data[activeSlide].id}`}
              className="w-12 md:w-14 h-12 md:h-14 rounded-full flex items-center justify-center border-2 border-white"
            >
              <IoPlay className="w-5 md:w-6 h-5 md:h-6" />
            </Link>
            <button
              onClick={() => changeSlide(setAcitveSlide, data.length, "next")}
              className="text-3xl md:text-4xl"
            >
              <RiArrowRightSLine />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSlider;
