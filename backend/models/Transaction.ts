import mongoose, {Types} from 'mongoose';
import User from "./User";
import Account from "./Account";
import Category from "./Category";
import type {ITransaction} from "../types";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema<ITransaction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Account.findById(value),
      message: 'Account does not exist'
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: 'Category does not exist'
    }
  },
  sum: {
    type: Number,
    required: true,
    min: 1,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;