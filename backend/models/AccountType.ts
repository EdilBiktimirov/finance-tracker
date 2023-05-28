import mongoose from 'mongoose';
import type {IAccountType} from "../types";

const Schema = mongoose.Schema;

const AccountTypeSchema = new Schema<IAccountType>({
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