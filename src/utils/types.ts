import { Document } from "mongoose";
export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
}

export interface IResponse {
  message?: string;
  data?: IBook[] | IBook;
  status?: string;
  statusCode?: number;
}
