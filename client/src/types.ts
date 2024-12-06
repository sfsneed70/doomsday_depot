// src/types.ts
export interface Product {
    _id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    stock: number;
  }
  
  export interface Deal {
    _id: string;
    name: string;
    price: number;
    salePrice: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    onSale: boolean;
    onSaleDate: string;
    description: string;
    stock: string;
  }