import { UsersRelations } from "../config/types";

export const getUsersCurrentStatus = (r: UsersRelations) => {
  switch (r) {
    case "":
      return "Добавить в друзья";
    case "follower":
      return "Принять запрос";
    case "followee":
      return "Отклонить запрос";
    case "friends":
      return "Удалить из друзей";
  }
};
