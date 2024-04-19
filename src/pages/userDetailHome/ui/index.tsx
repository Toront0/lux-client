import { Post } from "@/widgets";
import { getUserPosts } from "../api/useFetchUserPosts";
import { useParams } from "react-router-dom";
import { PostsSkeleton, reactQueryKeys } from "@/shared";
import { useTranslation } from "react-i18next";
import { useInfiniteQueryScroll } from "@/shared/hooks";

const UserDetailHomePage = () => {
  const { id } = useParams();

  const { query, ref, flattedContent } = useInfiniteQueryScroll(
    (pageParam) => getUserPosts(pageParam, id || "0"),
    [reactQueryKeys.userPosts, id]
  );

  const { t } = useTranslation();

  return (
    <section className="w-full  space-y-4 max-w-[768px]">
      {query.isLoading && !query.data ? (
        <PostsSkeleton />
      ) : flattedContent?.length === 0 ? (
        <div className="flex justify-center text-gray-4 dark:text-gray-12 mt-12 text-xl">
          {t("thisUserHasNoPosts")}
        </div>
      ) : (
        flattedContent?.map((v, i, arr) => {
          if (i === arr.length - 1) {
            return (
              <Post
                key={v.id}
                id={v.id}
                authorName={v.authorName}
                authorId={v.authorId}
                authorPImg={v.authorPImg}
                content={v.content}
                createdAt={v.createdAt}
                isRequesterLiked={v.isRequesterLiked}
                likesAmount={v.likesAmount}
                commentsAmount={v.commentsAmount}
                postMedia={v.postMedia}
                ref={ref}
              />
            );
          }

          return (
            <Post
              key={v.id}
              id={v.id}
              authorName={v.authorName}
              authorId={v.authorId}
              authorPImg={v.authorPImg}
              content={v.content}
              createdAt={v.createdAt}
              isRequesterLiked={v.isRequesterLiked}
              likesAmount={v.likesAmount}
              commentsAmount={v.commentsAmount}
              postMedia={v.postMedia}
            />
          );
        })
      )}
    </section>
  );
};

export default UserDetailHomePage;
