import { axiosInstance } from "@/shared";

export const insertComment = async (
  videoId: number,
  content: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> => {
  const { data } = await axiosInstance({
    url: "/video-comment",
    withCredentials: true,
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    data: {
      videoId,
      content
    }
  });

  return data;
};
