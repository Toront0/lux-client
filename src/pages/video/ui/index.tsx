import { VideoPreview } from "@/entities";

import { useTranslation } from "react-i18next";

import { VideosSkeleton, reactQueryKeys } from "@/shared";
import { fetchVideosLoader } from "../api/loader";
import { useInfiniteQueryScroll } from "@/shared/hooks";

const VideosPage = () => {
  const { flattedContent, containerRef, ref, query } = useInfiniteQueryScroll(
    fetchVideosLoader,
    [reactQueryKeys.videos]
  );

  const { t } = useTranslation();

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="h-full w-full overflow-y-auto"
    >
      <div className="p-2 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
          {t("navigationLinks.4.videos")}
        </h2>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4 md:mt-6 gap-4">
          {query.isLoading && <VideosSkeleton amount={15} />}
          {flattedContent?.map((v, i, arr) => {
            if (i === arr.length - 1) {
              return (
                <VideoPreview
                  key={v.id}
                  id={v.id}
                  title={v.title}
                  thumbnail={v.thumbnail}
                  authorFName={v.authorFName}
                  authorLName={v.authorLName}
                  authorPImg={v.authorPImg}
                  authorId={v.authorId}
                  viewsAmount={v.viewsAmount}
                  createdAt={v.createdAt}
                  url={v.url}
                  ref={ref}
                />
              );
            }

            return (
              <VideoPreview
                key={v.id}
                id={v.id}
                title={v.title}
                thumbnail={v.thumbnail}
                authorFName={v.authorFName}
                authorLName={v.authorLName}
                authorPImg={v.authorPImg}
                authorId={v.authorId}
                viewsAmount={v.viewsAmount}
                createdAt={v.createdAt}
                url={v.url}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default VideosPage;
