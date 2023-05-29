import { Dayjs } from 'dayjs';

export interface Account {
  _id: string;
  user: string;
  accountType: {
    title: string;
    image: string;
  };
  title: string;
  amount: number
  createdAt: string;
}

export interface AccountMutation {
  title: string;
  accountType: string;
  amount: string
}

export interface AccountType {
  _id: string;
  title: string;
  image: string;
}

export interface AccountTypeMutation {
  title: string;
  image: File | null;
}

export interface Transaction {
  _id: string;
  user: string;
  account: {
    _id: string;
    title: string;
  };
  category: {
    _id: string;
    title: string;
    type: string;
  };
  sum: number;
  createdAt: string;
  comment: string;
}

export interface TransactionMutation {
  account: string;
  category: string;
  sum: string;
  createdAt: Dayjs | null;
  comment: string;
}

export interface Category {
  _id: string;
  title: string;
  type: string;
}

export interface CategoryMutation {
  title: string;
  type: string;
}

export interface Statistics {
  date: string;
  amount: number;
}

export interface StatisticsMutation {
  start: Dayjs | null,
  end: Dayjs | null,
  category: string,
  account: string,
}


export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  image: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
  avatar: string;
  googleId?: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}