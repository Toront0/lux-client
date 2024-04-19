export type UsersRelations = "friends" | "follower" | "followee" | "";

export type UserType = {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  profileImg: string;
  bannerImg: string;
  status: string;
  followersAmount: number;
  followeesAmount: number;
  usersRelations: UsersRelations;
};
