import { Schema, type Document } from "mongoose";
import dayjs from "dayjs";

export interface IReview extends Document {
  username: string;
  review: string;
  rating: number
  dateCreated: Date | string;
}

const reviewSchema = new Schema<IReview>(
  {
    username: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date): string =>
        dayjs(timestamp).format("MMM DD, YYYY [at] hh:mm A"),
    },
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

export default reviewSchema;