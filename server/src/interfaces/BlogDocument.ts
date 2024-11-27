import { Types } from "mongoose";

export default interface IBlogDocument {
  _id: Types.ObjectId | string;
  author: string;
  title: string;
  content: string;
  dateCreated: Date | string;
}
