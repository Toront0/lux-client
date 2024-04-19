import { axiosInstance } from "@/shared";

export const insertComment = async (postId: number, content: string) => {
  const res = await axiosInstance({
    method: "POST",
    url: "/post-comment",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      postId,
      content
    }
  });

  if (res.status !== 200) {
    throw new Error("Failed to insert post comment");
  }
};
