import type { Types } from "mongoose";
import type { IProduct } from "../models/Product";

export default interface ICategoryDocument {
  _id: Types.ObjectId | string;
  name: string;
  imageUrl: string;
  products: IProduct[];
  productsCount: number;
  dateCreated: Date | string;
}

