import { useState } from "react";

import Tiptap from "@/shared/ui/Tiptap";
import { createPost } from "../api/createPost";

import { RiImageAddFill } from "react-icons/ri";

import { FaInfo } from "react-icons/fa";
import { SpinnerLoader } from "@/shared";
import { useMutation } from "@tanstack/react-query";

import { MdError } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useGetImage } from "@/shared/hooks";

const CreatePostPage = () => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  const { inputRef, images, error, getImageFile } = useGetImage();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createPost(inputValue, images),
    onSuccess: () => window.location.replace("/")
  });

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-2 md:p-6 max-w-[768px]">
        <h3 className="text-sm text-gray-4 dark:text-gray-12 font-semibold">
          {t("whatOnYourMind")}
        </h3>
        <Tiptap description={inputValue} onChange={(v) => setInputValue(v)} />

        <div className="mt-4 flex items-center gap-2 text-gray-6 dark:text-gray-9">
          <FaInfo />
          <div>
            <p className="text-gray-6 dark:text-gray-9 text-xs w-2/5 leading-4 block">
              {t("postImagesInfo")}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {images.length > 0 && (
            <>
              {images.map((v) => (
                <div className="w-1/4 aspect-square rounded-sm">
                  <img
                    src={v}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </>
          )}
          {images.length < 4 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-1/4 border-2 border-opac-b-1 dark:border-opac-w-1 flex flex-col items-center justify-center border-dashed aspect-square rounded bg-opac-b-1 text-gray-6 dark:text-gray-9 dark:bg-opac-w-1"
            >
              <RiImageAddFill className="text-2xl" />
            </button>
          )}
          <input
            type="file"
            onChange={getImageFile}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            className=" hidden"
          />
        </div>
        {error && (
          <div className="flex mt-2 items-center gap-1 text-[#b12f2f] dark:text-[#c86464]">
            <MdError className="text-xl" />
            <p className="text-xs w-full leading-4 block ">{error}</p>
          </div>
        )}
        <div className=" flex justify-end mt-6 gap-2">
          <button
            onClick={() => mutate()}
            disabled={isPending || inputValue.length < 1}
            className="px-3 py-1.5 rounded bg-blue-7 flex items-center gap-2 disabled:bg-blue-12 disabled:cursor-not-allowed disabled:dark:bg-blue-4 disabled:dark:text-gray-8 text-white text-sm"
          >
            {isPending && <SpinnerLoader className="w-5 h-5" />}
            {t("publish")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
