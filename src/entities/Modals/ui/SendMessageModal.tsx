import { Button, ModalAnimation, ModalContent } from "@/shared";
import { SyntheticEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { sendMessage } from "../api/sendMessage";

interface ISendMessageModal {
  isOpen: boolean;
  onClose: () => void;
  receiverId: number;
}

const SendMessageModal = ({
  onClose,
  isOpen,
  receiverId
}: ISendMessageModal) => {
  const [inputValue, setInputValue] = useState("");

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const res = await sendMessage(receiverId, inputValue);

    console.log("res", res);
  };

  return (
    <ModalAnimation onClose={onClose} isOpen={isOpen}>
      <ModalContent isOpen={isOpen} onClose={onClose}>
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-4 dark:text-gray-12">
              Отправить сообщение
            </h4>
            <Button onClick={onClose}>
              <IoMdClose className="w-full h-full" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-12 h-12 rounded-full bg-gray-12 dark:bg-gray-4"></div>
            <div className="flex flex-col">
              <h5 className="text-sm font-medium text-gray-4 dark:text-gray-12">
                Charles Pattersen
              </h5>
              <span className="text-xs text-gray-6 dark:text-gray-9">
                Last visited: 2 hours ago
              </span>
            </div>
          </div>
          <textarea
            name="message"
            id="message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded mt-3 bg-opac-b-2 dark:bg-opac-w-2 text-sm text-gray-4 dark:text-gray-12 focus:outline-none p-2 resize-none h-36 border border-opac-b-2 dark:border-opac-w-2 dark:focus:border-blue-8 focus:border-blue-7"
          />
          <div className="flex justify-end mt-4">
            <button
              disabled={inputValue.length < 0}
              className="px-3 py-1.5 rounded bg-blue-7 disabled:bg-blue-12 disabled:cursor-not-allowed disabled:dark:bg-blue-4 disabled:dark:text-gray-8 text-white text-sm"
            >
              Отправить
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalAnimation>
  );
};

export default SendMessageModal;
