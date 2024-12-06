import { IProduct } from "./Product";

export interface IBasketItem {
    product: IProduct;
    quantity: number;
    dateAdded: Date | string;
  }