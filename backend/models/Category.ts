import mongoose from 'mongoose';
import type {ICategory} from "../types";

const Schema = mongoose.Schema;

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['expenses', 'income'],
  },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;