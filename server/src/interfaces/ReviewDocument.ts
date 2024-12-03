import { Types } from "mongoose";

export default interface IReviewDocument {
  _id: Types.ObjectId | string;
  username: string;
  review: string;
  rating: number;
  dateCreated: Date | string;
}