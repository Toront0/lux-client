import { Button } from "@/shared";

import { TbMusicX } from "react-icons/tb";
import { useDeleteOrAddSong } from "../api/deleteOrArddSong";
import { deleteUserSong } from "../api/deleteUserSong";

interface IDeleteSongFromUserListButton {
  songId: number;
}

const DeleteSongFromUserListButton = ({
  songId
}: IDeleteSongFromUserListButton) => {
  const { mutate } = useDeleteOrAddSong(() => deleteUserSong(songId));

  return (
    <Button
      onClick={() => mutate()}
      className="text-gray-6 hidden group-hover:flex dark:text-gray-9"
    >
      <TbMusicX className="w-full text-gray-8 h-full" />
    </Button>
  );
};

export default DeleteSongFromUserListButton;
