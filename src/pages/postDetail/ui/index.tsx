import { Link, useParams } from "react-router-dom";
import { useFetchPostDetail } from "../api/useFetchPostDetail";
import { Button, formatTimeAgo, reactQueryKeys } from "@/shared";

import { HiDotsHorizontal } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { PostLike, PostShare } from "@/features";
import PostDetailComments from "./postDetailComments";
import Slider from "@/entities/Slider";
import { checkTypeOfAFile } from "@/widgets/Post/lib/checkTypeOfFile";
import { VideoPlayer } from "@/widgets";

const PostDetailPage = () => {
  const { id } = useParams();

  const { i18n } = useTranslation();

  const { data, isLoading } = useFetchPostDetail(id || "0");

  return (
    <div className="w-full h-full overflow-y-auto">
      {!isLoading && data && (
        <div className=" p-2 md:p-8 max-w-[768px] mx-auto">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-4">
                <img
                  src={data.authorPImg}
                  alt={data.authorName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <Link
                  to={`/${data.authorId}`}
                  className="text-sm font-semibold hover:underline text-black dark:text-gray-12"
                >
                  {data.authorName}
                </Link>
                <span className="text-xs text-gray-8">
                  {formatTimeAgo(data.createdAt, i18n.language)}
                </span>
              </div>
            </div>
            <div>
              <Button>
                <HiDotsHorizontal className="w-full h-full" />
              </Button>
            </div>
          </div>
          <pre className="text-sm whitespace-pre-wrap text-gray-4 dark:text-gray-12 mt-3">
            {data.content}
          </pre>
          <div className="w-full  mt-2">
            <Slider>
              {data.postMedia?.map((v) => (
                <>
                  {checkTypeOfAFile(v) === "img" && (
                    <img
                      src={v}
                      alt=""
                      className="w-full h-full   object-contain"
                    />
                  )}
                  {checkTypeOfAFile(v) === "video" && (
                    <VideoPlayer url={v} videoId={data.id} />
                  )}
                </>
              ))}
            </Slider>
          </div>
          <div className="flex relative z-20 items-center gap-4 mt-6">
            <PostLike
              postId={data.id}
              likesAmount={data.likesAmount}
              isUserLiked={!!data.isRequesterLiked}
              invalidateQueryKeys={[reactQueryKeys.postDetail, id]}
            />
            <div
              className={` text-gray-4 flex items-center gap-2 dark:text-white  transition-colors font-medium`}
            >
              <GoComment className="text-base md:text-xl" />
              <span className="text-[10px] md:text-sm font-medium text-gray-4 dark:text-gray-12">
                {data.commentsAmount}
              </span>
            </div>

            <PostShare />
          </div>
          <PostDetailComments postId={data.id} />
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
