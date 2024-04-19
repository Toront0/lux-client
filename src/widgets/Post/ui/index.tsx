import { PostLike, PostShare } from "@/features";
import { HiDotsHorizontal } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { Button, formatTimeAgo } from "@/shared";
import { PostType } from "../lib/types";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { QueryKey } from "@tanstack/react-query";
import Slider from "./Slider";
import { forwardRef, memo } from "react";
import PostContent from "./PostContent";
import { checkTypeOfAFile } from "../lib/checkTypeOfFile";

import VideoSlide from "./VideoSlide";

interface IPost extends PostType {
  invalidateQueryKeys?: QueryKey;
}

const Post = memo(
  forwardRef(
    (
      {
        id,
        createdAt,
        content,
        authorId,
        authorName,
        authorPImg,
        isRequesterLiked,
        likesAmount,
        invalidateQueryKeys,
        commentsAmount,
        postMedia
      }: IPost,
      ref
    ) => {
      const { i18n } = useTranslation();

      return (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="w-full  border-t border-opac-b-2 dark:border-opac-w-1   rounded "
        >
          <div className=" p-3 md:p-4 mt-4">
            <div className=" w-full h-full block  ">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/${authorId}`}
                    className="w-9 h-9 rounded-full bg-gray-12 dark:bg-gray-4"
                  >
                    <img
                      src={authorPImg}
                      alt={authorName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link
                      to={`/${authorId}`}
                      className="text-sm font-semibold hover:underline text-black dark:text-gray-12"
                    >
                      {authorName}
                    </Link>
                    <span className="text-xs text-gray-8">
                      {formatTimeAgo(createdAt, i18n.language)}
                    </span>
                  </div>
                </div>
                <div>
                  <Button>
                    <HiDotsHorizontal className="w-full h-full" />
                  </Button>
                </div>
              </div>
              <PostContent content={content} />
              <Slider>
                {postMedia?.map((v, i) => (
                  <div
                    key={i}
                    className="min-w-full px-1 bg-opac-b-1 dark:bg-opac-w-1 relative pb-[calc(100%-200px)]"
                  >
                    <div className="absolute w-full h-full  top-0  left-0">
                      {checkTypeOfAFile(v) === "img" && (
                        <img
                          src={v}
                          alt="post media file"
                          className="w-full h-full   object-contain"
                        />
                      )}
                      {checkTypeOfAFile(v) === "video" && (
                        <VideoSlide url={v} videoId={id} />
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="flex relative z-20 items-center gap-4 mt-6">
                <PostLike
                  postId={id}
                  likesAmount={likesAmount}
                  isUserLiked={!!isRequesterLiked}
                  invalidateQueryKeys={invalidateQueryKeys}
                />
                <Link
                  to={`/posts/${id}`}
                  className={` text-gray-4 flex items-center gap-2 dark:text-white  transition-colors font-medium`}
                >
                  <GoComment className="text-base md:text-xl" />
                  <span className="text-[10px] md:text-sm font-medium text-gray-4 dark:text-gray-12">
                    {commentsAmount}
                  </span>
                </Link>

                <PostShare />
              </div>
            </div>
          </div>
        </div>
      );
    }
  )
);

export default Post;
