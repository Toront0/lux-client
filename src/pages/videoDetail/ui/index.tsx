import { VideoPlayer } from "@/widgets";

import { useParams } from "react-router-dom";
import VideoDetailComments from "./VideoDetailComments";
import VideoDetailDescription from "./VideoDetailDescription";
import VideoDetailHeader from "./VideoDetailHeader";
import { videoDetailQuery } from "../api/loader";
import { useQuery } from "@tanstack/react-query";

const VideoDetailPage = () => {
  const { id } = useParams();

  const { data } = useQuery(videoDetailQuery(id || "0"));

  console.log("data", data);

  // const data = { url: vid };

  return (
    <>
      {data && (
        <div className="w-full h-full overflow-y-auto">
          <div className="p-2 md:p-4 grid grid-cols-1 gap-4 xl:grid-cols-4">
            <div className="w-full  xl:col-span-3">
              <div className="w-full aspect-video">
                <VideoPlayer url={data.url} videoId={data.id} />
              </div>
              <VideoDetailHeader
                authorId={data.authorId}
                authorFName={data.authorFName}
                authorLName={data.authorLName}
                authorPImg={data.authorPImg}
                title={data.title}
                createdAt={data.createdAt}
                viewsAmount={data.viewsAmount}
              />
              <VideoDetailDescription description={""} />

              <div className="mt-6">
                <VideoDetailComments videoId={data.id} />
              </div>
            </div>
            {/* <div className="w-full xl:col-span-1">
              <div className="w-full flex gap-2">
                <div className="w-1/2 aspect-video">
                  <img src={data.authorPImg} alt={data.authorFName} className="rounded" />
                </div>
                <div className="w-1/2 ">
                  <h3 className="text-gray-2 text-sm dark:text-gray-14 line-clamp-2 font-semibold">
                    NYUSHA / НЮША - Наедине (Official Clip) HD
                  </h3>
                  <h5 className="text-xs my-1 text-gray-6 dark:text-gray-8">
                    Samsung
                  </h5>
                  <div className="flex gap-1.5 text-xs text-gray-6 dark:text-gray-8 items-center">
                    <span>{5000} просмотров</span>
                    <span className="before:content-['·']"></span>
                    <span>{new Date().getTime()}</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetailPage;
