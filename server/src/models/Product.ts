import { Schema, model, type Document, Types } from "mongoose";
import reviewSchema, { IReview } from "./Review.js";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  reviews: IReview[];
  reviewCount: number;
  rating: number;
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