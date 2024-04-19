import { SongsLoader, reactQueryKeys } from "@/shared";
import { useParams } from "react-router-dom";
import { getPlaylistSongs } from "../api/getPlaylistSongs";
import { MusicPlayer, Song } from "@/widgets";

import { ImStarEmpty } from "react-icons/im";
import { useInfiniteQueryScroll } from "@/shared/hooks";
import { useTranslation } from "react-i18next";
import { useMusicState } from "@/stores";

const InfinitePlaylistSongs = () => {
  const { playlistId, userId } = useParams();

  const { t } = useTranslation();
  const { musicUrl } = useMusicState(["musicUrl"]);

  const { query, containerRef, ref, flattedContent } = useInfiniteQueryScroll(
    (pageParam) =>
      getPlaylistSongs(pageParam, userId || "0", playlistId || "0"),
    [reactQueryKeys.playlistSongs, playlistId]
  );

  return (
    <div className="bg-gray-15 relative  dark:bg-black py-12 h-full">
      <div className=" max-w-[1440px] px-2 md:px-4 mx-auto">
        {query.isLoading && <SongsLoader />}

        {!query.isLoading && flattedContent?.length === 0 ? (
          <div className="flex h-32 items-center gap-2 justify-center flex-col">
            <ImStarEmpty className="text-3xl" />
            {t("playlistEmpty")}
          </div>
        ) : (
          <div className="relative">
            {musicUrl && (
              <div className="sticky top-0 w-full bg-gray-15 dark:bg-black z-40">
                <MusicPlayer />
              </div>
            )}
            <section
              ref={containerRef as React.RefObject<HTMLElement>}
              className="mt-4"
            >
              <div>
                {flattedContent?.map((s, i, arr) => {
                  if (i === arr.length - 1) {
                    return (
                      <Song
                        key={s.id}
                        title={s.title}
                        cover={s.cover}
                        performer={s.performer}
                        id={s.id}
                        idx={i}
                        url={s.url}
                        ref={ref}
                        isInMyList={s.isInMyList}
                      />
                    );
                  }

                  return (
                    <Song
                      key={s.id}
                      title={s.title}
                      cover={s.cover}
                      performer={s.performer}
                      id={s.id}
                      idx={i}
                      url={s.url}
                      isInMyList={s.isInMyList}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfinitePlaylistSongs;
