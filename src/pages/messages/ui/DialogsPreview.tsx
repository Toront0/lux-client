import { SearchInput } from "@/entities";
import { Dispatch, SetStateAction } from "react";
import { useFetchDialogs } from "../api/useFetchDialogs";

import DialogsSkeletonLoading from "./dialogsSkeletonLoader";
import { DialogInfo } from "../config/types";
import { useAuthSession } from "@/shared/hooks";
import { useTranslation } from "react-i18next";

interface IDialogsPreview {
  setOpenDialog: Dispatch<SetStateAction<DialogInfo>>;
}

const DialogsPreview = ({ setOpenDialog }: IDialogsPreview) => {
  const authUser = useAuthSession();
  const { t } = useTranslation();

  const { data, isFetching } = useFetchDialogs();

  return (
    <div className="w-full h-full ">
      <div className="p-2 md:p-4">
        <h2 className="font-semibold text-gray-1 dark:text-gray-15">
          {t("dialogs")}
        </h2>
        <SearchInput placeholder="Find a friend" />
      </div>
      <div className="w-full ">
        {isFetching && <DialogsSkeletonLoading />}
        {!isFetching &&
          data?.map((v) => (
            <div
              onClick={() =>
                setOpenDialog({
                  senderId: v.senderId,
                  receiverId: v.receiverId,
                  contactFName: v.contactFName,
                  contactLName: v.contactLName,
                  contactPImg: v.contactPImg
                })
              }
              className="flex  cursor-pointer  p-2 md:px-4 mx:py-2 hover:bg-opac-b-1 dark:hover:bg-opac-w-1 gap-2 items-center"
            >
              <div className="min-w-[40px] h-10 rounded-full bg-gray-12 dark:bg-gray-4">
                <img
                  src={v.contactPImg}
                  alt={v.contactFName}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="w-full ">
                <h4 className="text-gray-1 text-sm dark:text-gray-15 font-semibold">
                  {v.contactFName} {v.contactLName}
                </h4>
                <p className="  line-clamp-1 text-xs text-gray-6 dark:text-gray-9">
                  {v.senderId === authUser?.id ? "Вы: " + v.message : v.message}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DialogsPreview;
