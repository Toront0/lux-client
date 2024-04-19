import { useGetImage } from "@/shared/hooks";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProfileImg {
  currentImage: string;
  setCurrentImg: (img: string) => void;
}

const ProfileImg = ({ currentImage, setCurrentImg }: IProfileImg) => {
  const { t } = useTranslation();

  const { inputRef, getImageFile, error } = useGetImage({
    imgStore: "single",
    onSuccess: setCurrentImg
  });

  return (
    <div>
      <h3 className="text-sm text-gray-3 dark:text-gray-13 font-medium">
        {t("profileImg")}
      </h3>
      <div className="flex items-center gap-4 mt-2">
        <div className="min-w-[64px] md:min-w-[80px] h-16 md:h-20 md:w-20 rounded-full bg-gray-12 dark:bg-gray-4">
          <img
            src={currentImage}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="file"
            name="profileImg"
            id="profileImg"
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
            {t("profileImgInfo")}
          </p>
        </div>
      </div>
      {error && <p className="text-sm text-error mt-2">{error}</p>}
    </div>
  );
};

export default ProfileImg;
