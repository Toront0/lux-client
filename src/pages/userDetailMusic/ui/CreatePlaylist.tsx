import { useState } from "react";
import { SlPlaylist } from "react-icons/sl";

import CreatePlaylistForm from "./CreatePlaylistForm";
import { useTranslation } from "react-i18next";

const CreatePlaylist = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="min-w-[33%] cursor-pointer w-1/3 lg:min-w-[25%] lg:w-1/4 xl:min-w-[16%] xl:w-1/6"
      >
        <div className="w-full aspect-square flex-col gap-2 rounded text-gray-6 dark:text-gray-9 text-3xl bg-gray-12 dark:bg-gray-4 flex items-center justify-center">
          <SlPlaylist />
          <span className="text-sm">{t("createNewPlaylist")}</span>
        </div>
      </div>
      {openModal && (
        <CreatePlaylistForm
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default CreatePlaylist;
