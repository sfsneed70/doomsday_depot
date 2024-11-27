import type { IComment } from "./Comment";

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  username?: string;
  dateCreated: string;
  comments?: IComment[] | null | [];
  commentCount?: number;
}
