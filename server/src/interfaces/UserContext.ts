import { Types } from "mongoose";

export default interface IUserContext {
  headers?: {authorization?: string, referer?: string | URL},
  user: {
    username: string | null;
    email: string | null;
    _id: Types.ObjectId | null | string;
  } | null;
}
