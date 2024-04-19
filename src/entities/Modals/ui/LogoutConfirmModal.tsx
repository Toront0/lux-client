import { Button, ModalAnimation, ModalContent } from "@/shared";
import { SyntheticEvent } from "react";

import { IoMdClose } from "react-icons/io";
import { handleLogout } from "../api/logout";
import { useTranslation } from "react-i18next";

interface ILogoutConfirmModal {
  onClose: () => void;
  isOpen: boolean;
}

const LogoutConfirmModal = ({ onClose, isOpen }: ILogoutConfirmModal) => {
  const { t } = useTranslation();

  const submitLogout = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await handleLogout();

      if (res) {
        window.location.replace("/auth");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalAnimation isOpen={isOpen} onClose={onClose}>
      <ModalContent isOpen={isOpen} onClose={onClose}>
        <form onSubmit={submitLogout}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-4 dark:text-gray-12">
              {t("confirmAction")}
            </h4>
            <Button type="button" onClick={onClose}>
              <IoMdClose className="w-full h-full" />
            </Button>
          </div>
          <p className="text-sm mt-2 text-gray-4 dark:text-gray-12">
            {t("confirmLogoutInfo")}
          </p>
          <div className="flex w-full mt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-opac-b-2 w-full py-1.5 rounded font-medium dark:bg-opac-w-2 text-sm text-gray-4 dark:text-gray-12"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className=" w-full py-1.5 rounded font-medium bg-blue-8 text-sm text-white"
            >
              {t("confirm")}
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalAnimation>
  );
};

export default LogoutConfirmModal;
