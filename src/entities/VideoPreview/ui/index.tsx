import { Link } from "react-router-dom";
import { VideoPreviewType } from "../config/types";
import { formatTimeAgo, getNoun } from "@/shared";

import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import VideoBlock from "./VideoBlock";

const VideoPreview = forwardRef(
  (
    {
      id,
      title,
      authorFName,
      authorLName,
      authorId,
      authorPImg,
      thumbnail,
      viewsAmount,
      createdAt,
      url
    }: VideoPreviewType,
    ref
  ) => {
    const { i18n } = useTranslation();

    return (
      <Link
        to={`/videos/${id}`}
        className="w-full group"
        ref={ref as React.RefObject<HTMLAnchorElement>}
      >
        <VideoBlock url={url} thumbnail={thumbnail} title={title} />
        <div className="flex gap-2 mt-2">
          <Link
            to={`/${authorId}`}
            className="min-w-[36px] w-9 h-9 rounded-full bg-gray-12 dark:bg-gray-4"
          >
            <img
              src={authorPImg}
              alt={authorFName}
              className="w-full h-full rounded-full object-cover"
            />
          </Link>
          <div className=" overflow-hidden">
            <h4 className=" line-clamp-2 leading-1 text-[9px] md:text-[13px] text-gray-2 dark:text-gray-14">
              {title}
            </h4>
            <div className="truncate ">
              <Link
                to={`/${authorId}`}
                className="text-[8px] hover:underline truncate  md:text-xs my-1 text-gray-6 dark:text-gray-8"
              >
                {authorFName} {authorLName}
              </Link>
            </div>
            <div className="flex gap-1.5 text-xs text-gray-6 dark:text-gray-8 items-center">
              <span>
                {i18n.language === "ru"
                  ? viewsAmount +
                    " " +
                    getNoun(viewsAmount, "просмотр", "просмотра", "просмотров")
                  : viewsAmount + " views"}
              </span>
              <span className="before:content-['·']"></span>
              <span>{formatTimeAgo(createdAt, i18n.language)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

export default VideoPreview;
