import { axiosInstance } from "@/shared";

export const createPost = async (content: string, imgs: string[]) => {
  const { data } = await axiosInstance({
    method: "POST",
    url: "/create-post",
    withCredentials: true,
    headers: { "Content-Type": "text/plain" },
    data: {
      content,
      imgs
    }
  });

  return data;
};
