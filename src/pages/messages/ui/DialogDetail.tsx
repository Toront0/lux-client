import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { IoMdArrowRoundBack } from "react-icons/io";

import { Button, formatTimeAgo, reactQueryKeys } from "@/shared";
import { getDialogMessages } from "../api/getDialogMessages";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownButtonItem,
  DropdownContent,
  DropdownTrigger
} from "@/shared/dropdown";
import { HiDotsVertical } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { MdBlockFlipped } from "react-icons/md";
import DialogDetailInput from "./DialogDetailInput";
import { DialogInfo, UserMessageType } from "../config/types";
import { useWebsocket } from "@/stores";
import { useAuthSession, useInfiniteQueryScroll } from "@/shared/hooks";

interface IDialogDetail {
  dialogDetail: DialogInfo;
  setDialogDetailWithId: Dispatch<SetStateAction<DialogInfo>>;
}

const DialogDetail = ({
  dialogDetail,
  setDialogDetailWithId
}: IDialogDetail) => {
  const authUser = useAuthSession();
  const scrollRef = useRef<HTMLElement>();

  const ws = useWebsocket();

  const { flattedContent } = useInfiniteQueryScroll<UserMessageType>(
    (pageParam) =>
      getDialogMessages(
        pageParam,
        dialogDetail.senderId,
        dialogDetail.receiverId
      ),
    [reactQueryKeys.dialogDetail]
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [flattedContent?.length]);

  useEffect(() => {
    ws.initDialogDetailQueryKey([reactQueryKeys.dialogDetail]);

    ws.messagesListenerSetup();
  }, []);

  const { i18n, t } = useTranslation();

  return (
    <>
      {dialogDetail.senderId ? (
        <section className="w-full  h-full flex flex-col">
          <div className="flex items-center p-2 md:p-4 justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDialogDetailWithId({} as DialogInfo)}
                className="text-gray-4 lg:hidden block text-xl dark:text-gray-12"
              >
                <IoMdArrowRoundBack />
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-12 dark:bg-gray-4">
                <img
                  src={dialogDetail.contactPImg}
                  alt={dialogDetail.contactPImg}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h5 className="text-sm font-semibold text-gray-4 dark:text-gray-12">
                {dialogDetail.contactFName} {dialogDetail.contactLName}
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button>
                    <HiDotsVertical className="w-full h-full" />
                  </Button>
                </DropdownTrigger>
                <DropdownContent position="bottom-right">
                  <DropdownButtonItem>
                    <LuPhone className="text-xl " />
                    <span className="text-sm ">{t("audioCall")}</span>
                  </DropdownButtonItem>
                  <DropdownButtonItem>
                    <AiOutlineVideoCameraAdd className="text-xl " />
                    <span className="text-sm ">{t("videoCall")}</span>
                  </DropdownButtonItem>
                  <DropdownButtonItem>
                    <MdBlockFlipped className="text-xl text-[#f00]" />
                    <span className="text-sm ">{t("blockUser")}</span>
                  </DropdownButtonItem>
                </DropdownContent>
              </Dropdown>
            </div>
          </div>
          <div className="w-full h-full   overflow-hidden  py-y gap-6  ">
            <div className=" h-full overflow-y-auto px-4 flex flex-col">
              <div className="w-full">
                {flattedContent?.map((v) => (
                  <div
                    className={`flex  ${
                      v.senderId === authUser?.id ? "justify-end" : ""
                    } gap-2 my-4`}
                  >
                    <Link
                      to={`/${v.senderId}`}
                      className={`min-w-[40px] w-10 ${
                        v.senderId === authUser?.id ? "order-1" : ""
                      } h-10 rounded-full bg-gray-12 dark:bg-gray-4`}
                    >
                      <img
                        src={v.profileImg}
                        alt="sender messag image"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </Link>
                    <div>
                      <div
                        className={`text-[9px] ${
                          v.senderId === authUser?.id
                            ? "bg-blue-10 dark:bg-blue-5 text-white"
                            : "bg-opac-b-1 dark:bg-opac-w-1 text-gray-4 dark:text-gray-12"
                        } leading-tight font-medium p-3 rounded md:text-sm  `}
                      >
                        {v.message}
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] md:text-xs text-gray-7 dark:text-gray-8">
                          {formatTimeAgo(v.createdAt, i18n.language)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef as React.RefObject<HTMLDivElement>}></div>
              </div>
            </div>
          </div>
          <DialogDetailInput receiverId={dialogDetail.receiverId} />
        </section>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-4 dark:text-gray-12">
          Choose dialog in the left sidebar
        </div>
      )}
    </>
  );
};

export default DialogDetail;
