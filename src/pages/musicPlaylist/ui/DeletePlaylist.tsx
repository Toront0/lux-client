import { Button, ModalContent } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { deletePlaylist } from "../api/deletePlaylist";
import { useParams } from "react-router-dom";

interface IDeletePlaylist {
  playlistId: number;
}

const DeletePlaylist = ({ playlistId }: IDeletePlaylist) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useParams();

  const { mutate } = useMutation({
    mutationFn: () => deletePlaylist(playlistId),
    onSuccess: () => {
      window.location.replace(`/${userId}/music`);
    }
  });

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <AiFillDelete className="w-full h-full text-error" />
      </Button>
      {isModalOpen && (
        <ModalContent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-4 dark:text-gray-12">
                Подтвердите действие
              </h4>
              <Button type="button" onClick={() => setIsModalOpen(false)}>
                <IoMdClose className="w-full h-full" />
              </Button>
            </div>
            <p className="text-sm mt-2 text-gray-4 dark:text-gray-12">
              Вы уверены, что хотите удалить данный плейлист? Это событие
              необратимо.
            </p>
            <div className="flex w-full mt-4 gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-opac-b-2 w-full py-1.5 rounded font-medium dark:bg-opac-w-2 text-sm text-gray-4 dark:text-gray-12"
              >
                Отменить
              </button>
              <button
                onClick={() => mutate()}
                className=" w-full py-1.5 rounded font-medium bg-[#e62727] dark:bg-[#b61717] text-sm text-white"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </ModalContent>
      )}
    </>
  );
};

export default DeletePlaylist;
