export type PostType = {
  id: number;
  createdAt: Date;
  content: string;
  authorId: number;
  authorName: string;
  authorPImg: string;
  likesAmount: number;
  isRequesterLiked: number;
  commentsAmount: number;
  postMedia?: string[];
};
