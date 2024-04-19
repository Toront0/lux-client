import { Button } from "@/shared";
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import EditPlaylistModal from "./EditPlaylistModal";

const EditPlaylist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <IoSettingsSharp className="w-full h-full" />
      </Button>
      {isModalOpen && (
        <EditPlaylistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default EditPlaylist;
