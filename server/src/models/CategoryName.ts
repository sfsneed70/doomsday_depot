import mongoose, { Schema, model, Document, Types } from "mongoose";

// Interface to define the shape of the CategoryName document
export interface ICategoryName extends Document {
  name: string;
  imageUrl: string;
  products: Types.ObjectId[];
  createdAt: Date | string;
  productCount: number;
}

// Schema for the CategoryName model
const CategoryNameSchema = new Schema<ICategoryName>(
  {
    name: { type: String, required: true, unique: true }, // Category name
    imageUrl: { type: String, required: true }, // Image for the category
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }], // Associated products
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date): string => new Date(timestamp).toISOString(),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Virtual field for product count
CategoryNameSchema.virtual("productCount").get(function (this: ICategoryName) {
  return this.products.length;
});

// Export the model as "CategoryName"
const CategoryName = model<ICategoryName>("CategoryName", CategoryNameSchema);

export default CategoryName;
