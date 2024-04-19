import { axiosInstance } from "@/shared";

export const handleLikePost = async (
  postId: number,
  userId: number,
  op: "add" | "delete"
): Promise<void> => {
  const res = await axiosInstance({
    method: "POST",
    url: op === "add" ? "/like-post" : "/delete-like-post",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      postId,
      userId
    }
  });

  if (res.status !== 200) {
    throw new Error("Failed to like the post");
  }
};
