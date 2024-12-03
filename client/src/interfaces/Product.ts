import type { IReview } from "./Review";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  reviews: IReview[] | null | [];
  reviewCount?: number;
  rating?: number;
}
