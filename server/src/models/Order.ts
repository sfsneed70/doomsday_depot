import { Schema, Document } from "mongoose";
import { IProduct } from "./Product";

export interface IOrder extends Document {
  purchaseDate: Date;
  products: IProduct[];
}

const orderSchema = new Schema<IOrder>({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default orderSchema;