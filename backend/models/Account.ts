import mongoose, {Types} from 'mongoose';
import User from "./User";
import AccountType from "./AccountType";
import type {IAccount} from "../types";

const Schema = mongoose.Schema;

const AccountSchema = new Schema<IAccount>({
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
  accountType: {
    type: Schema.Types.ObjectId,
    ref: 'AccountType',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => AccountType.findById(value),
      message: 'Account type does not exist'
    }
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Account = mongoose.model('Account', AccountSchema);
export default Account;