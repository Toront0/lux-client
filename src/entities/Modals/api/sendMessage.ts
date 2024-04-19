import { axiosInstance } from "@/shared";

export const sendMessage = async (receiverId: number, message: string) => {
  const { data } = await axiosInstance({
    method: "post",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    url: "/message",
    data: {
      receiverId,
      message
    }
  });

  return data;
};
