import { axiosInstance } from "@/shared";
import { UsersRelations } from "../lib/types";

const followUser = async (userId: number): Promise<void> => {
  const { data } = await axiosInstance({
    method: "post",
    url: `/users/${userId}/follow`,
    withCredentials: true,
    headers: { "Content-Type": "text/plain" }
  });

  return data;
};

const deleteFollow = async (userId: number): Promise<void> => {
  const { data } = await axiosInstance({
    method: "post",
    url: `/users/${userId}/delete-follow`,
    withCredentials: true,
    headers: { "Content-Type": "text/plain" }
  });

  return data;
};

const addFriend = async (userId: number): Promise<void> => {
  const { data } = await axiosInstance({
    method: "post",
    url: `/users/${userId}/friend`,
    withCredentials: true,
    headers: { "Content-Type": "text/plain" }
  });

  return data;
};

const deleteFriendship = async (userId: number): Promise<void> => {
  const { data } = await axiosInstance({
    method: "post",
    url: `/users/${userId}/delete-friend`,
    withCredentials: true,
    headers: { "Content-Type": "text/plain" }
  });

  return data;
};

export const onUserAction = (r: UsersRelations, userId?: number) => {
  if (!userId) {
    throw new Error("user Id was not provided ");
  }

  switch (r) {
    case "":
      return followUser(userId);
    case "friends":
      return deleteFriendship(userId);
    case "follower":
      return addFriend(userId);
    case "followee":
      return deleteFollow(userId);
  }
};
