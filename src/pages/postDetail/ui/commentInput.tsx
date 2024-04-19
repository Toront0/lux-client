import { Button, reactQueryKeys } from "@/shared";
import React, { useState, useRef } from "react";

import { MdOutlineEmojiEmotions } from "react-icons/md";
import { insertComment } from "../api/insertComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface ICommentInput {
  postId: number;
}

const CommentInput = ({ postId }: ICommentInput) => {
  const [expandButtons, setExpandButtons] = useState(false);
  const replyInputRef = useRef<HTMLInputElement>();

  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => insertComment(postId, inputValue),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.postComments]
      });
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.postDetail]
      });
      setInputValue("");
    }
  });

  const { t } = useTranslation();

  return (
    <div className="py-2 w-full">
      <div className="relative">
        <input
          type="text"
          id="reply"
          name="reply"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setExpandButtons(true)}
          ref={replyInputRef as React.RefObject<HTMLInputElement>}
          className="w-full bg-transparent peer text-sm border-b py-2 border-opac-b-2 dark:border-opac-w-2 text-gray-4 dark:text-gray-12 focus:outline-none"
          placeholder={t("writeYourComment")}
        />
        <div className="absolute top-full w-full h-0.5 rounded scale-x-0 opacity-0 peer-focus:scale-x-100 peer-focus:opacity-100 transition-all  bg-black dark:bg-white "></div>
      </div>
      {expandButtons && (
        <div className="flex justify-between mt-2 ">
          <Button>
            <MdOutlineEmojiEmotions className="w-full h-full" />
          </Button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpandButtons(false)}
              className="px-3 py-1.5 rounded bg-opac-b-2 dark:bg-opac-w-1 text-gray-4 dark:text-gray-12 text-sm"
            >
              {t("cancel")}
            </button>
            <button
              disabled={inputValue.length < 2 || isPending}
              onClick={() => mutate()}
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
