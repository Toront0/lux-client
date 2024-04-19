import { CheckBox, Input, ModalContent } from "@/shared";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";
import { RiImageAddLine } from "react-icons/ri";
import AddSongsToPlaylist from "./AddSongsToPlaylist";
import { FormData, PossibleFormState } from "../lib/types";
import { useForm, useGetImage } from "@/shared/hooks";

interface ICreatePlaylistForm {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePlaylistForm = ({ isOpen, onClose }: ICreatePlaylistForm) => {
  const [currentMode, setCurrentMode] = useState<PossibleFormState>("general");

  const { values, handleChange } = useForm<FormData>();

  const { inputRef, getImageFile, images, error } = useGetImage({
    imgStore: "single"
  });

  return (
    <ModalContent isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-gray-4 font-semibold dark:text-gray-12">
          Создать плейлист
        </h3>
      </div>
      {currentMode === "general" ? (
        <>
          <div className="flex mt-4 gap-4">
            <div>
              <button
                onClick={() => inputRef.current?.click()}
                className="min-w-[128px] w-32 text-3xl flex flex-col items-center justify-center  aspect-square bg-gray-12 dark:bg-gray-4 rounded border border-dashed text-gray-6 dark:text-gray-9 border-gray-9 dark:border-gray-7"
              >
                {images[0] ? (
                  <img
                    src={images[0]}
                    alt=""
                    className=" object-cover w-full h-full"
                  />
                ) : (
                  <>
                    <RiImageAddLine />
                    <span className="text-xs">Обложка</span>
                  </>
                )}
                <input
                  type="file"
                  onChange={getImageFile}
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  className="hidden"
                />
              </button>
              {error && <p className="text-xs text-error">{error}</p>}
            </div>
            <div className="w-full">
              <div>
                <Input
                  placeholder="Название плейлиста"
                  value={values.title}
                  name="title"
                  id="title"
                  onChange={(e) =>
                    handleChange(
                      e.target.name as keyof FormData,
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="mt-2">
                <CheckBox
                  checked={values.isPrivate}
                  onChange={(n, v) => handleChange(n as keyof FormData, v)}
                  label="Публичный плейлист"
                  name="isPrivate"
                  id="isPrivate"
                />
                <div className="flex gap-2">
                  <FaInfo />
                  <p className="text-xs text-gray-6 mt-1 dark:text-gray-9">
                    Если плейлист публичный, он может появится на основной
                    странице музыки. Тогда как приватный будет доступен
                    пользователям только на вашей личной странице.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={onClose}
              className="bg-opac-b-2 w-1/2 py-1 rounded dark:bg-opac-w-2 text-gray-4 dark:text-gray-12"
            >
              Отменить
            </button>
            <button
              onClick={() => setCurrentMode("songs-list")}
              className="w-1/2 py-1 rounded bg-blue-7 gap-2 disabled:bg-blue-12 disabled:cursor-not-allowed disabled:dark:bg-blue-4 disabled:dark:text-gray-8 text-white text-sm"
            >
              Продолжить
            </button>
          </div>
        </>
      ) : (
        <AddSongsToPlaylist
          setCurrentMode={setCurrentMode}
          values={values}
          onClose={onClose}
        />
      )}
    </ModalContent>
  );
};

export default CreatePlaylistForm;
