import { axiosInstance } from "@/shared";
import { UserMessageType } from "../config/types";

export const getDialogMessages = async (
  page: number,
  senderId: number,
  receiverId: number
): Promise<UserMessageType[]> => {
  const { data } = await axiosInstance({
    method: "POST",
    url: `/messages?page=${page}`,
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      senderId: senderId,
      receiverId: receiverId
    }
  });

  console.log("data", data);

  return data;
};
