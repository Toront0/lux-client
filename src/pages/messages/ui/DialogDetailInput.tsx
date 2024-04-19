import { useState } from "react";

import { Button } from "@/shared";
import { useWebsocket } from "@/stores";
import { IoSend } from "react-icons/io5";
import { useAuthSession } from "@/shared/hooks";
import { sendMessage } from "../api/websocket";

interface IDialogDetailInput {
  receiverId: number;
}

const DialogDetailInput = ({ receiverId }: IDialogDetailInput) => {
  const authUser = useAuthSession();

  const wsConn = useWebsocket((s) => s.ws);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="w-full flex p-4 gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-2 focus:outline-none py-2 rounded bg-opac-b-1 dark:bg-opac-w-2 text-sm text-gray-4 dark:text-gray-12"
        placeholder="Send message"
      />
      <Button
        onClick={() =>
          sendMessage(
            JSON.stringify({
              receiverId: receiverId,
              data: {
                id: 5,
                createdAt: new Date(),
                senderId: authUser?.id,
                senderPImg: authUser?.profileImg,
                message: inputValue
              }
            }),
            wsConn
          )
        }
      >
        <IoSend className="w-full h-full" />
      </Button>
    </div>
  );
};

export default DialogDetailInput;
