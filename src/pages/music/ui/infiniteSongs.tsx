import { SongsLoader, reactQueryKeys } from "@/shared";
import { MusicPlayer, Song } from "@/widgets";

import { getMusic } from "../api/getMusic";
import { useInfiniteQueryScroll } from "@/shared/hooks";
import { useMusicState } from "@/stores";

const InfiniteSongs = () => {
  const { query, containerRef, ref, flattedContent } = useInfiniteQueryScroll(
    getMusic,
    [reactQueryKeys.music]
  );

  const { musicUrl } = useMusicState(["musicUrl"]);

  return (
    <section
      ref={containerRef as React.RefObject<HTMLElement>}
      className="mt-2 py-4 "
    >
      {query.isLoading && <SongsLoader />}
      <div className="relative">
        {musicUrl && (
          <div className="sticky top-0 w-full bg-gray-15 dark:bg-black z-40">
            <MusicPlayer />
          </div>
        )}
        <div className="mt-8">
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
      </div>
    </section>
  );
};

export default InfiniteSongs;
