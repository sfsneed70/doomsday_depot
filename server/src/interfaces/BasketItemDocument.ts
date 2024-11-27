import { Types } from "mongoose";

export default interface IBasketItemDocument {
  _id: Types.ObjectId | string;
  product: Types.ObjectId | string;
  quantity: number;
  dateAdded: Date | string;
}
