import type { IReview } from "./Review";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  onSale?: boolean;
  salePrice?: number;
  onSaleDate?: string;
  reviews: IReview[] | null | [];
  reviewCount?: number;
  rating?: number;
}
