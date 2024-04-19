import { Button } from "@/shared";

import { FiPlus } from "react-icons/fi";
import { useDeleteOrAddSong } from "../api/deleteOrArddSong";
import { addSongToUser } from "../api/addSongToUser";

interface IAddSongToUserListButton {
  songId: number;
}

const AddSongToUserListButton = ({ songId }: IAddSongToUserListButton) => {
  const { mutate } = useDeleteOrAddSong(() => addSongToUser(songId));

  return (
    <Button
      onClick={() => mutate()}
      className="text-gray-6 hidden group-hover:flex dark:text-gray-9"
    >
      <FiPlus className="w-full text-gray-8 h-full" />
    </Button>
  );
};

export default AddSongToUserListButton;
