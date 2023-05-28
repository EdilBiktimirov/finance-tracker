import mongoose from 'mongoose';
import type { ITransactionCategory} from "../types";

const Schema = mongoose.Schema;

const TransactionCategorySchema = new Schema<ITransactionCategory>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['expenses', 'income']
  },
});

const TransactionCategory = mongoose.model('TransactionCategory', TransactionCategorySchema);
export default TransactionCategory;