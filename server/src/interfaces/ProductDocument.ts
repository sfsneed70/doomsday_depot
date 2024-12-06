import { Types } from 'mongoose';

export default interface IProductDocument {
  _id: Types.ObjectId | string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  dateCreated: Date | string;
}