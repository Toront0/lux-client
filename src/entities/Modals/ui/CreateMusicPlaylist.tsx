import { MdLibraryMusic } from "react-icons/md";

import { IoIosArrowForward } from "react-icons/io";
import { BsFillPlayFill } from "react-icons/bs";

import { IoClose } from "react-icons/io5";

import { Dispatch, SetStateAction, useState } from "react";
import {
  AutoResizeTextarea,
  Button,
  Input,
  ModalAnimation,
  ModalContent
} from "@/shared";

type PlaylistPreview = {
  id: number;
  title: string;
  coverImg: string;
};

export type UserMusicWOImg = {
  id: number;
  title: string;
  performer: string;
  url: string;
};

interface ICreateMusicPlaylist {
  isOpen: boolean;
  onClose: () => void;
  setPLists?: Dispatch<SetStateAction<PlaylistPreview[]>>;
}

const CreateMusicPlaylist = ({ isOpen, onClose }: ICreateMusicPlaylist) => {
  const [currentMode, setCurrentMode] = useState<"general" | "choose-music">(
    "general"
  );
  const [chosenSongs] = useState<UserMusicWOImg[]>([]);

  const [inputValues, setInputValues] = useState({
    title: "",
    description: ""
  });

  return (
    <ModalAnimation isOpen={isOpen} onClose={onClose}>
      <ModalContent isOpen={isOpen} onClose={onClose}>
        {currentMode === "general" ? (
          <>
            <Button onClick={onClose} className="absolute top-2 right-2">
              <IoClose className="w-full h-full" />
            </Button>
            <form className=" flex flex-col h-full">
              <h2 className="text-lg text-gray-4 p-4 dark:text-gray-12 font-bold">
                Создание нового плейлиста
              </h2>
              <div className=" gap-2 h-1/2 px-4">
                <button
                  type="button"
                  className="w-full h-48 rounded flex flex-col gap-2 items-center justify-center border-2 border-dashed border-opac-b-2 dark:border-opac-w-2 text-gray-6 dark:text-gray-9"
                >
                  {/* <img src={} alt="" className="" /> */}
                  <MdLibraryMusic className="text-3xl" />
                  <span className="text-xs ">Добавьте обложку</span>
                </button>
                <div className="w-full mt-3">
                  <div className="w-full">
                    <label
                      htmlFor="title"
                      className="text-sm text-gray-4 dark:text-gray-12 font-medium"
                    >
                      Название
                    </label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Название плейлиста"
                      value={inputValues.title}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          title: e.target.value
                        }))
                      }
                    />
                  </div>
                  <div className="w-full flex mt-2 flex-col">
                    <label
                      htmlFor="description"
                      className="text-sm text-gray-4 dark:text-gray-12 font-medium"
                    >
                      Описание
                    </label>

                    <AutoResizeTextarea
                      id="description"
                      name="description"
                      placeholder="Описание плейлиста"
                      value={inputValues.description}
                      maxLength={100}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          description: e.target.value
                        }))
                      }
                    />
                    <span className="text-sm text-right text-gray-4 dark:text-gray-12 font-medium">
                      {inputValues.description.length || 0} / 100
                    </span>
                  </div>
                  <span className="text-xs  mt-2 block text-gray-7 dark:text-gray-8">
                    Пустой плейлист
                  </span>
                </div>
              </div>
              <div className="  h-1/2">
                <div className=" flex flex-col h-full  ">
                  <div className="px-2 py-3 border-y border-opac-b-1 dark:border-opac-w-1">
                    <button
                      type="button"
                      onClick={() => setCurrentMode("choose-music")}
                      className="text-sm rounded hover:bg-opac-b-1 dark:hover:bg-opac-w-1 p-2 flex items-center justify-between w-full text-gray-4 dark:text-gray-12"
                    >
                      <div>
                        <span>Добавить аудиозаписи</span>
                      </div>
                      <IoIosArrowForward className="text-lg" />
                    </button>
                  </div>
                  <div className="p-2 overflow-y-auto h-full ">
                    {chosenSongs.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center gap-2 hover:bg-opac-b-1 dark:hover:bg-opac-w-1 p-2 rounded cursor-pointer"
                      >
                        <button
                          type="button"
                          className="cursor-pointer w-7 h-7 rounded-full  active:scale-95 bg-purple-8 flex items-center justify-center bg-gradient-to-br from-purple-7 via-purple-8 to-purple-10"
                        >
                          <BsFillPlayFill className="text-lg text-gray-12" />
                        </button>
                        <span className="text-gray-4 dark:text-gray-12 text-[13px] font-medium">
                          {v.performer} - {v.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 flex gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-sm  text-gray-4 dark:text-gray-12 bg-opac-b-1 dark:bg-opac-w-1 w-1/2 py-1.5 font-medium rounded"
                    >
                      Отменить
                    </button>
                    <button
                      disabled={
                        inputValues.title.length < 1 || chosenSongs.length < 1
                      }
                      type="submit"
                      className="text-sm disabled:bg-purple-12 disabled:text-gray-8 dark:disabled:bg-purple-4 dark:disabled:text-gray-6  text-white bg-purple-7 w-1/2 py-1.5 font-medium rounded"
                    >
                      Создать
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div></div>
          //   <AddUserMusic
          //     setCurrentMode={setCurrentMode}
          //     onAddMusicToPlaylist={setChosenSongs}
          //     currSongs={chosenSongs}
          //   />
        )}
      </ModalContent>
    </ModalAnimation>
  );
};

export default CreateMusicPlaylist;
