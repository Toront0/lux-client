export type OnFetchReplies = (
  commentId: number,
  limit: number,
  offset: number
) => Promise<UserCommentType[]>;

export type UserCommentType = {
  id: number;
  createdAt: Date;
  content: string;
  authorId: number;
  authorFName: string;
  authorLName: string;
  authorPImg: string;
  likesAmount: number;
  repliesAmount: number;
  isRequesterLiked: number;
};
