import { AutoResizeTextarea } from "@/shared";
import { useToaster } from "@/stores";
import { ToastType } from "@/stores/toaster/toaster.types";
import { useState } from "react";

import { IoSendSharp } from "react-icons/io5";

const MessageToast = ({ id, subtitle, img, title }: ToastType) => {
  const deleteToast = useToaster((s) => s.deleteToast);
  const [isInputExpanded, setIsInputExpanded] = useState(false);

  return (
    <div className="rounded w-96 bg-white shadow-elev-2 dark:shadow-elev-2-dark border border-opac-b-1  dark:border-opac-w-1 dark:bg-gray-1">
      <div className="flex relative z-20 dark:bg-gray-1  ">
        <div className="flex items-center w-full  gap-2  p-3">
          <div className="min-w-[40px] h-10 rounded-full bg-gray-12 dark:bg-gray-4">
            <img
              src={img}
              alt={title}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-1 dark:text-gray-15">
              {title}
            </h4>
            <p className="text-xs text-gray-4 dark:text-gray-12 line-clamp-2">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="min-w-fit border-l   border-opac-b-1 dark:border-opac-w-1 ">
          <button
            onClick={() => deleteToast(id)}
            className="h-1/2 px-3 w-full border-b border-opac-b-1 dark:border-opac-w-1 flex items-center  text-sm text-gray-4 dark:text-gray-12"
          >
            Закрыть
          </button>
          <button
            onClick={() => setIsInputExpanded((p) => !p)}
            className="h-1/2 px-3 w-full  flex items-center  text-sm text-gray-4 dark:text-gray-12"
          >
            Ответить
          </button>
        </div>
      </div>

      {isInputExpanded && (
        <div
          className={`px-3 relative z-0 py-2 gap-2  flex border-t bg-white dark:bg-gray-2  border-opac-b-1 dark:border-opac-w-1`}
        >
          <AutoResizeTextarea placeholder="Send a message" />
          {/* <input
            type="text"
            placeholder="Send a message"
            className="text-sm text-gray-2 w-full dark:text-gray-14 bg-transparent focus:outline-none"
          /> */}
          <button className=" py-1">
            <IoSendSharp className="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageToast;
