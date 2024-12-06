import { Schema, type Document } from "mongoose";
import type { IProduct } from "./Product";
import dayjs from "dayjs";

export interface IBasketItem extends Document {
  product: IProduct;
  quantity: number;
  dateAdded: Date | string;
}

const basketItemSchema = new Schema<IBasketItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date): string =>
        dayjs(timestamp).format("MMM DD, YYYY [at] hh:mm A"),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

export default basketItemSchema;
