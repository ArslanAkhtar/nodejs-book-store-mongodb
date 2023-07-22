import mongoose, { Schema } from "mongoose";
import { IBook } from "../utils/types";

const BookSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
