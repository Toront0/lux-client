export type UserMessageType = {
  id: number;
  createdAt: Date;
  senderId: number;
  receiverId: number;
  message: string;
  profileImg: string;
};

export type DialogInfo = {
  senderId: number;
  receiverId: number;
  contactFName: string;
  contactLName: string;
  contactPImg: string;
};
