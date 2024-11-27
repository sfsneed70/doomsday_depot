import { Schema, model, type Document, Types } from "mongoose";
import dayjs from "dayjs";
import type { IReview } from "./Review";
import reviewSchema from "./Review.js";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  dateCreated: Date | string;
  reviews: IReview[];
  // reviewCount: number;
  // rating: number;
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
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
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
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / this.reviews.length;
  });
  
  const Product = model<IProduct>("Product", productSchema);
  
  export default Product;