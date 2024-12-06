import { Types } from "mongoose";
import { IProduct } from "../models/Product";

export default interface IOrderDocument {
    _id: Types.ObjectId | string;
    purchaseDate: Date;
    products: Types.ObjectId[] | IProduct[];
}