import { SongsLoader, reactQueryKeys } from "@/shared";
import { Song } from "@/widgets";
import { useParams } from "react-router-dom";

import { getMusic } from "../api/getMusic";
import { useTranslation } from "react-i18next";
import { useInfiniteQueryScroll } from "@/shared/hooks";

const InfiniteSongs = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const { query, ref, flattedContent } = useInfiniteQueryScroll(
    (pageParam) => getMusic(pageParam, id || "0"),
    [reactQueryKeys.userMusic, id]
  );

  return (
    <section className="mt-2 py-4">
      {query.isLoading && <SongsLoader />}
      {!query.isLoading && flattedContent?.length === 0 ? (
        <div className="flex justify-center text-gray-4 dark:text-gray-12 mt-12 text-xl">
          {t("thisUserHasNoMusic")}
        </div>
      ) : (
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
      )}
    </section>
  );
};

export default InfiniteSongs;
