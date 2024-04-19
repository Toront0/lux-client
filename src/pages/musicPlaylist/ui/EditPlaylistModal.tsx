import {
  Button,
  CheckBox,
  Input,
  ModalContent,
  reactQueryKeys
} from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { getPlaylistPreview } from "../api/getPlaylistPreview";
import { FaInfo } from "react-icons/fa";
import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import PlaylistAndAvailableSongs from "./PlaylistAndAvailableSongs";
import { useGetImage } from "@/shared/hooks";

interface IEditPlaylistModal {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormData {
  title: string;
  coverImg: string;
  isPrivate: boolean;
  songs: number[];
}

const EditPlaylistModal = ({ isOpen, onClose }: IEditPlaylistModal) => {
  const { playlistId } = useParams();

  const { data } = useQuery({
    queryKey: [reactQueryKeys.playlistDetail, playlistId],
    queryFn: () => getPlaylistPreview(playlistId || "0")
  });

  const { error, getImageFile, images, inputRef } = useGetImage({
    imgStore: "single"
  });

  const [values, setValues] = useState<IFormData>({
    coverImg: images[0],
    isPrivate: false,
    title: data?.title || "",
    songs: []
  });

  return (
    <ModalContent isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-4 dark:text-gray-12">
          Редактировать плейлист
        </h4>
        <Button type="button" onClick={onClose}>
          <IoMdClose className="w-full h-full" />
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex mt-4 gap-4">
          <div>
            <button
              onClick={() => inputRef.current?.click()}
              className="min-w-[128px] w-32 text-3xl flex flex-col items-center justify-center  aspect-square bg-gray-12 dark:bg-gray-4 rounded border border-dashed text-gray-6 dark:text-gray-9 border-gray-9 dark:border-gray-7"
            >
              {values.coverImg ? (
                <img
                  src={values.coverImg}
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
                  setValues((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value
                  }))
                }
              />
            </div>
            <div className="mt-2">
              <CheckBox
                checked={values.isPrivate}
                onChange={(n, v) =>
                  setValues((prev) => ({
                    ...prev,
                    [n]: v
                  }))
                }
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
        <PlaylistAndAvailableSongs />
      </div>
    </ModalContent>
  );
};

export default EditPlaylistModal;
