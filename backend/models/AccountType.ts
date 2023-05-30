import mongoose, {Types} from 'mongoose';
import type {IAccountType} from "../types";
import User from "./User";

const Schema = mongoose.Schema;

const AccountTypeSchema = new Schema<IAccountType>({
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
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const AccountType = mongoose.model('AccountType', AccountTypeSchema);
export default AccountType;