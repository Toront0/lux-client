import { useGetImage } from "@/shared/hooks";
import React from "react";
import { useTranslation } from "react-i18next";

interface IBannerImg {
  currentImage: string;
  setCurrentImg: (img: string) => void;
}

const BannerImg = ({ currentImage, setCurrentImg }: IBannerImg) => {
  const { t } = useTranslation();

  const { inputRef, getImageFile, error } = useGetImage({
    imgStore: "single",
    onSuccess: setCurrentImg
  });

  return (
    <div className="mt-6">
      <h3 className="text-sm text-gray-3 dark:text-gray-13 font-medium">
        {t("bannerImg")}
      </h3>
      <div className="flex items-center gap-4 mt-2">
        <div className="min-w-[120px] md:min-w-[160px] h-16 md:h-20 rounded bg-gray-12 dark:bg-gray-4">
          {currentImage && (
            <img
              src={currentImage}
              alt=""
              className="w-full h-full rounded object-cover"
            />
          )}
        </div>
        <div>
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="file"
            name="bannerImg"
            id="bannerImg"
            onChange={getImageFile}
            className=" appearance-none hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-2 py-1 rounded bg-opac-b-2 dark:bg-opac-w-2 text-xs md:text-sm text-gray-4 font-medium dark:text-gray-12"
          >
            {t("update")}
          </button>
          <p className="text-xs text-gray-6 dark:text-gray-9 mt-1">
            {t("bannerImgInfo")}
          </p>
        </div>
      </div>
      {error && <p className="text-sm text-error mt-2">{error}</p>}
    </div>
  );
};

export default BannerImg;
