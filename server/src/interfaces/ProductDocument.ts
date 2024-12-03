import { Types } from 'mongoose';

export default interface IProductDocument {
  _id: Types.ObjectId | string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  dateCreated: Date | string;
}

