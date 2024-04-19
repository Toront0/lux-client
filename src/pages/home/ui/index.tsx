import { Post, PostType } from "@/widgets";
import { getPosts } from "../api/useFetchPosts";
import SkeletonLoading from "./skeletonLoading";

import { reactQueryKeys } from "@/shared";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthSession, useInfiniteQueryScroll } from "@/shared/hooks";

const HomePage = () => {
  const authUser = useAuthSession();
  const { t } = useTranslation();

  const { query, flattedContent, containerRef, ref } =
    useInfiniteQueryScroll<PostType>(getPosts, [reactQueryKeys.posts]);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="w-full h-full overflow-y-auto"
    >
      <div className="p-2 md:p-8 max-w-[768px] mx-auto">
        {query.isPending ? (
          <SkeletonLoading />
        ) : (
          <div className="w-full ">
            <Link
              to="/create-post"
              className="w-full  rounded bg-white block  dark:bg-gray-1"
            >
              <div className=" text-gray-4 p-3 border-b border-opac-b-1 dark:border-opac-w-1 dark:text-gray-12 font-semibold">
                {t("postSomething")}
              </div>
              <div className="flex items-center gap-2 p-3">
                <div className="min-w-[32px] w-8 h-8 rounded-full bg-gray-12 dark:bg-gray-4">
                  <img
                    src={authUser?.profileImg}
                    alt="user profile img"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-6 dark:text-gray-9">
                  {t("whatOnYourMind")}
                </span>
              </div>
            </Link>
            <section className="mt-4 space-y-4">
              {flattedContent?.map((p, i, arr) => {
                if (i === arr.length - 1) {
                  return (
                    <Post
                      key={p.id}
                      id={p.id}
                      createdAt={p.createdAt}
                      content={p.content}
                      authorId={p.authorId}
                      authorName={p.authorName}
                      authorPImg={p.authorPImg}
                      likesAmount={p.likesAmount}
                      isRequesterLiked={p.isRequesterLiked}
                      invalidateQueryKeys={[reactQueryKeys.posts]}
                      commentsAmount={p.commentsAmount}
                      postMedia={p.postMedia}
                      ref={ref}
                    />
                  );
                }

                return (
                  <Post
                    key={p.id}
                    id={p.id}
                    createdAt={p.createdAt}
                    content={p.content}
                    authorId={p.authorId}
                    authorName={p.authorName}
                    authorPImg={p.authorPImg}
                    likesAmount={p.likesAmount}
                    isRequesterLiked={p.isRequesterLiked}
                    invalidateQueryKeys={[reactQueryKeys.posts]}
                    commentsAmount={p.commentsAmount}
                    postMedia={p.postMedia}
                  />
                );
              })}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
