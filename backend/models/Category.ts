import mongoose, {Types} from 'mongoose';
import type {ICategory} from "../types";
import User from "./User";

const Schema = mongoose.Schema;

const CategorySchema = new Schema<ICategory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['expenses', 'income'],
  },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;