import type { IProduct } from "./Product";

export interface ICategory {
  _id: string;
  name: string;
  imageUrl: string;
  products: IProduct[] | null | [];
  productsCount?: number;
}
