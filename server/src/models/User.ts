import { Schema, model, type Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import type { IBasketItem } from "./BasketItem";
import basketItemSchema from "./BasketItem.js";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
  basket: IBasketItem[];
  basketCount: number;
  basketTotal: number;
  taxAmount?: number; 
  discountAmount?: number; 
  finalTotal?: number; 
  promoCode?: string; 
}


const validPromoCodes: Record<string, number> = {
  SAVE10: 0.1, 
  SAVE20: 0.2, 
};

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true, // instantly creates a B-tree index on the username field for fast lookups
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
    promoCode: {
      type: String,
      default: null, 
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
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

// Virtual fields
userSchema.virtual("basketTotal").get(function (this: IUser) {
  let total = 0;
  for (const item of this.basket) {
    // @ts-ignore
    total += item.quantity * item.product.price;
  }
  return total; 
});

userSchema.virtual("taxAmount").get(function (this: IUser) {
  const basketTotal = this.basketTotal || 0; 
  const taxRate = 0.09; // 9% tax
  return Number((basketTotal * taxRate).toFixed(2)); 
});

userSchema.virtual("discountAmount").get(function (this: IUser) {
  if (this.promoCode && this.promoCode in validPromoCodes) {
    const discount = validPromoCodes[this.promoCode]; 
    return Number((this.basketTotal * discount).toFixed(2)); 
  }
  return 0; // No discount given
});

userSchema.virtual("finalTotal").get(function (this: IUser) {
  const basketTotal = this.basketTotal || 0; 
  const taxAmount = this.taxAmount || 0; 
  const discountAmount = this.discountAmount || 0; 
  return Number((basketTotal + taxAmount - discountAmount).toFixed(2)); 
});


const User = model<IUser>("User", userSchema);

export default User;
