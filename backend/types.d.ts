import {ObjectId} from "mongoose";

export interface IAccount {
  user: ObjectId;
  accountType: ObjectId;
  title: string;
  amount: number
  createdAt: Date;
}

export interface IAccountType {
  user: ObjectId;
  title: string;
  image: string;
}

export interface ICategory {
  user: ObjectId;
  title: string;
  type: string;
}

export interface ITransaction {
  user: ObjectId;
  account: ObjectId;
  category: ObjectId;
  sum: number;
  createdAt: Date;
  comment: string;
}


export interface IUser {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
  googleId?: string;
}