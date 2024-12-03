import { Schema, model, type Document, Types } from "mongoose";
import dayjs from "dayjs";

export interface ICategory extends Document {
  name: string;
  imageUrl: string;
  products: Types.ObjectId[];
  productCount: number;
  dateCreated: Date | string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
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
  }
);

CategorySchema.virtual("productCount").get(function (this: ICategory) {
  return this.products.length;
});

const Category = model<ICategory>("Category", CategorySchema);

export default Category;