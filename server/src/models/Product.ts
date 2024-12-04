import { Schema, model, type Document, Types } from "mongoose";
import dayjs from "dayjs";
import type { IReview } from "./Review";
import reviewSchema from "./Review.js";

export interface IProduct extends Document {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  onSale: boolean;
  onSaleDate: Date;
  dateCreated: Date | string;
  reviews: IReview[];
}

const productSchema = new Schema<IProduct>(
    {
      name: {
        type: String,
        required: true,
        unique: true, // instantly creates a b-tree index on the username field for fast lookups
      },
      description: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
      onSaleDate: {
        type: Date,
        default: Date.now,
      },
      dateCreated: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date): string =>
          dayjs(timestamp).format("MMM DD, YYYY [at] hh:mm A"),
      },
      reviews: [reviewSchema],
    },
    // set this to use virtual below
    {
      toJSON: {
        virtuals: true,
      },
    },
  );
  
  productSchema.virtual("reviewCount").get(function (this: IProduct) {
    return this.reviews.length;
  });

  productSchema.virtual("rating").get(function (this: IProduct) {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.reviews.length).toFixed(2);
  });

  productSchema.virtual("onSale").get(function (this: IProduct) {
    return this.onSaleDate > new Date(Date.now());
  });

  productSchema.virtual("salePrice").get(function (this: IProduct) {
    if (this.onSale) {
      return (this.price * 0.8).toFixed(2);
    }
    return this.price;
  });
  
  const Product = model<IProduct>("Product", productSchema);
  
  export default Product;