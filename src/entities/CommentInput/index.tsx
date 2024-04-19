import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

interface ICommentInput extends React.InputHTMLAttributes<HTMLInputElement> {
  onSend?: () => void;
  isPending?: boolean;
}

const CommentInput = ({ onSend, isPending, ...rest }: ICommentInput) => {
  const { t } = useTranslation();
  const [expandButtons, setExpandButtons] = useState(false);
  const replyInputRef = useRef<HTMLInputElement>();

  return (
    <div className="py-2 w-full">
      <div className="relative">
        <input
          type="text"
          {...rest}
          autoComplete="off"
          onFocus={() => setExpandButtons(true)}
          ref={replyInputRef as React.RefObject<HTMLInputElement>}
          className="w-full bg-transparent peer text-sm border-b py-2 border-opac-b-2 dark:border-opac-w-2 text-gray-4 dark:text-gray-12 focus:outline-none"
          placeholder={t("writeYourComment")}
        />
        <div className="absolute top-full w-full h-0.5 rounded scale-x-0 opacity-0 peer-focus:scale-x-100 peer-focus:opacity-100 transition-all  bg-black dark:bg-white "></div>
      </div>
      {expandButtons && (
        <div className="flex justify-between mt-2 ">
          <div></div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpandButtons(false)}
              className="px-3 py-1.5 rounded bg-opac-b-2 dark:bg-opac-w-1 text-gray-4 dark:text-gray-12 text-sm"
            >
              {t("cancel")}
            </button>
            <button
              disabled={!rest.value || isPending}
              onClick={onSend}
              className="px-3 py-1.5 rounded bg-blue-7 disabled:bg-blue-12 disabled:cursor-not-allowed disabled:dark:bg-blue-4 disabled:dark:text-gray-8 text-white text-sm"
            >
              {t("send")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
