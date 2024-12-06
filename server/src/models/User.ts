import { Schema, model, type Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import type { IBasketItem } from "./BasketItem";
import basketItemSchema from "./BasketItem.js";
import orderSchema from "./Order.js";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
  orders: Types.Array<Types.ObjectId>;
  basket: IBasketItem[];
  basketCount: number;
  basketTotal: number;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true, // instantly creates a b-tree index on the username field for fast lookups
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    basket: [basketItemSchema],
    orders: [orderSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// hash user password
userSchema.pre<IUser>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("basketCount").get(function (this: IUser) {
  return this.basket.length;
});

userSchema.virtual("basketTotal").get(function (this: IUser) {
  let total = 0;
  for (const item of this.basket) {
    total += item.quantity * item.product.price;
  }
  return total.toFixed(2);
});

const User = model<IUser>("User", userSchema);

export default User;
