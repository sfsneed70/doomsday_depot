import type { IBlog } from "../models/Blog";
import type { IBasketItem } from "../models/BasketItem";
import type { Types } from "mongoose";

export default interface IUserDocument {
  _id: Types.ObjectId | string;
  username: string | null;
  email: string | null;
  blogs?: Types.ObjectId[] | IBlog[] | [];
  isCorrectPassword(password: string): Promise<boolean>;
  blogCount: number | null;
  basket: IBasketItem[];
  basketCount: number | null;
  basketTotal: number | null;
}
