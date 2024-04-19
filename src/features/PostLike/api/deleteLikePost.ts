import { axiosInstance } from "@/shared";

export const handleDeleteLikePost = async (
  postId: number,
  userId: number
): Promise<void> => {
  const res = await axiosInstance({
    method: "POST",
    url: "/delete-like-post",
    headers: { "Content-Type": "text/plain" },
    withCredentials: true,
    data: {
      postId,
      userId
    }
  });

  if (res.status !== 200) {
    throw new Error("Failed to delete like from the post");
  }
};
