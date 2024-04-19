import { formatTime, getNoun } from "@/shared";
import { useTranslation } from "react-i18next";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IVideoDetailHeader {
  title: string;
  authorId: number;
  authorFName: string;
  authorLName: string;
  authorPImg: string;
  createdAt: Date;
  viewsAmount: number;
}

const VideoDetailHeader = ({
  title,
  authorId,
  authorFName,
  authorLName,
  authorPImg,
  createdAt,
  viewsAmount
}: IVideoDetailHeader) => {
  const { i18n } = useTranslation();

  return (
    <div className="mt-4 ">
      <div className="flex justify-between items-start">
        <div className="">
          <h2 className="text-base md:text-xl text-gray-2 font-bold dark:text-gray-14">
            {title}
          </h2>
          <div className="flex gap-1.5 text-xs text-gray-6 dark:text-gray-8 items-center">
            <span>
              {i18n.language === "ru"
                ? viewsAmount +
                  " " +
                  getNoun(viewsAmount, "просмотр", "просмотра", "просмотров")
                : viewsAmount + " views"}
            </span>
            <span className="before:content-['·']"></span>
            <span>{formatTime(createdAt, i18n.language)}</span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Link
              to={`/${authorId}`}
              className="min-w-[40px] h-10 rounded-full bg-gray-12 dark:bg-gray-4"
            >
              <img
                src={authorPImg}
                alt={authorFName}
                className="w-full h-full rounded-full object-cover"
              />
            </Link>
            <div>
              <Link
                to={`/${authorId}`}
                className="text-sm hover:underline font-semibold text-gray-4 dark:text-gray-12"
              >
                {authorFName} {authorLName}
              </Link>
            </div>
          </div>
        </div>
        <button
          className={` group px-3 hover:dark:text-white text-black flex items-center gap-2 dark:text-gray-12  transition-colors text-xs xl:text-sm font-semibold`}
        >
          <FiHeart className="text-xl lg:group-hover:[fill-rule:nonzero] lg:group-hover:[fill:black] dark:lg:group-hover:[fill:white] transition-transform lg:group-hover:scale-[1.2]" />
          <span className="text-sm font-semibold text-gray-4 dark:text-gray-12">
            781 Likes
          </span>
          {/* <FaHeartBroken className="text-xl hidden lg:group-hover:block " /> */}
        </button>
      </div>
    </div>
  );
};

export default VideoDetailHeader;
