import { reactQueryKeys } from "@/shared";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getPlaylistDetail } from "../api/getPlaylistInfo";
import InfinitePlaylistSongs from "./InfinitePlaylistSongs";

import DeletePlaylist from "./DeletePlaylist";

import { useTranslation } from "react-i18next";
import { useAuthSession } from "@/shared/hooks";

const MusicPlaylistPage = () => {
  const { t } = useTranslation();
  const authUser = useAuthSession();

  const { playlistId } = useParams();

  const { data } = useQuery({
    queryKey: [reactQueryKeys.playlistDetail, playlistId],
    queryFn: () => getPlaylistDetail(playlistId || "0")
  });

  return (
    <>
      {data && (
        <div className="w-full h-full relative overflow-y-auto">
          <div className="absolute  top-0 left-0 w-full h-full ">
            <img
              src={data.coverImg}
              alt=""
              className="  object-cover w-full h-full"
            />
          </div>
          <div className="relative z-30 flex h-full flex-col ">
            <div className="max-w-[1440px] flex items-center  w-full mt-12 justify-between px-2 md:px-4 mx-auto">
              <div></div>
              <div className="flex items-center gap-2">
                {authUser?.id === data.creatorId && (
                  <DeletePlaylist playlistId={data?.id} />
                )}
              </div>
            </div>
            <div className="relative  pt-[40%] md:pt-[25%] ">
              <div className="bg-gradient-to-t from-gray-15 dark:from-black via-opac-w-10 dark:via-opac-b-10 to-transparent w-full h-full absolute bottom-0 left-0 right-0 z-10"></div>
              <div className=" relative z-20 max-w-[1440px] flex items-center justify-between px-2 md:px-4 mx-auto">
                <div className="">
                  <h2 className="text-4xl md:text-5xl leading-5   font-bold text-black dark:text-white">
                    {data.title}
                  </h2>
                </div>
                <div className="flex items-center px-2 w-fit rounded mt-4 py-2 gap-2">
                  <div className="text-right">
                    <Link
                      to={`/${data?.creatorId}`}
                      className=" hover:underline font-semibold  text-gray-4 dark:text-gray-12"
                    >
                      <span>{data?.creatorFName}</span>{" "}
                      <span>{data?.creatorLName}</span>
                    </Link>
                    <h4 className="text-xs text-gray-6 dark:text-gray-10">
                      {t("playlistCreator")}
                    </h4>
                  </div>
                  <Link
                    to={`/${data?.creatorId}`}
                    className="min-w-[80px] w-20 h-20 rounded-full shadow-elev-2 dark:shadow-elev-2-dark bg-gray-12 dark:bg-gray-4 "
                  >
                    <img
                      src={data?.creatorPImg}
                      alt={data?.creatorFName}
                      className="w-full h-full rounded-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <InfinitePlaylistSongs />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlaylistPage;
