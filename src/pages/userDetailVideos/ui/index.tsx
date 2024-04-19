import { VideoPreview } from "@/entities";

import { getUserVideos } from "../api/useFetchUserVideos";
import { useParams } from "react-router-dom";
import { VideosSkeleton, reactQueryKeys } from "@/shared";

import { useTranslation } from "react-i18next";
import { useInfiniteQueryScroll } from "@/shared/hooks";

const UserDetailVideosPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const { query, ref, flattedContent } = useInfiniteQueryScroll(
    (pageParam) => getUserVideos(pageParam, id || "0"),
    [reactQueryKeys.userVideos, id]
  );

  return (
    <div className="w-full h-full overflow-y-auto max-w-[2000px] mx-auto">
      <div className="grid grid-cols-1  md:grid-cols-2   w-full h-full lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-4">
        {query.isLoading && <VideosSkeleton />}
        {!query.isLoading && flattedContent?.length === 0 ? (
          <div className="flex justify-center text-gray-4 w-full dark:text-gray-12 mt-12 text-xl">
            {t("thisUserHasNoVideos")}
          </div>
        ) : (
          flattedContent?.map((v, i, arr) => {
            if (i === arr.length - 1) {
              return (
                <VideoPreview
                  key={v.id}
                  id={v.id}
                  createdAt={v.createdAt}
                  title={v.title}
                  thumbnail={v.thumbnail}
                  authorFName={v.authorFName}
                  authorLName={v.authorLName}
                  authorId={v.authorId}
                  authorPImg={v.authorPImg}
                  url={v.url}
                  viewsAmount={v.viewsAmount}
                  ref={ref}
                />
              );
            }

            return (
              <VideoPreview
                key={v.id}
                id={v.id}
                createdAt={v.createdAt}
                title={v.title}
                thumbnail={v.thumbnail}
                authorFName={v.authorFName}
                authorLName={v.authorLName}
                authorId={v.authorId}
                authorPImg={v.authorPImg}
                url={v.url}
                viewsAmount={v.viewsAmount}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserDetailVideosPage;
