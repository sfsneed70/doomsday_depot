import mongoose, { Schema, model, Document, Types } from "mongoose";


export interface ICategoryName extends Document {
  name: string;
  imageUrl: string;
  products: Types.ObjectId[];
  createdAt: Date | string;
  productCount: number;
}


const CategoryNameSchema = new Schema<ICategoryName>(
  {
    name: { type: String, required: true, unique: true }, 
    imageUrl: { type: String, required: true }, 
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }], 
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


CategoryNameSchema.virtual("productCount").get(function (this: ICategoryName) {
  return this.products.length;
});


const CategoryName = model<ICategoryName>("CategoryName", CategoryNameSchema);

export default CategoryName;