import { useState } from "react";
import DialogsPreview from "./DialogsPreview";
import DialogDetail from "./DialogDetail";
import { DialogInfo } from "../config/types";

const MessagesPage = () => {
  const [dialogDetail, setDialogDetail] = useState<DialogInfo>(
    {} as DialogInfo
  );

  return (
    <div className="w-full h-full  flex">
      <div
        className={`w-full lg:max-w-[350px] ${
          dialogDetail ? "hidden md:block" : "block"
        } overflow-y-auto h-full  bg-gray-15 dark:bg-gray-1`}
      >
        <DialogsPreview setOpenDialog={setDialogDetail} />
      </div>
      <div
        className={`w-full h-full  lg:block ${
          dialogDetail ? "block" : "hidden"
        }`}
      >
        {dialogDetail.senderId && (
          <DialogDetail
            dialogDetail={dialogDetail}
            setDialogDetailWithId={setDialogDetail}
          />
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
