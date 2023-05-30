import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import User from "./models/User";
import AccountType from "./models/AccountType";
import Account from "./models/Account";
import Category from "./models/Category";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('accounts');
    await db.dropCollection('accounttypes');
    await db.dropCollection('categories');
    await db.dropCollection('transactions');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user1, user2] = await User.create({
    email: "user1@gmail.com",
    displayName: "User1",
    password: "123",
    token: crypto.randomUUID(),
    role: "user",
    avatar: 'fixtures/adminAvatar.png'
  }, {
    email: "user2@gmail.com",
    displayName: "User2",
    password: "123",
    token: crypto.randomUUID(),
    role: "user",
    avatar: 'fixtures/userAvatar.jpg'
  });

  const [wallet, bankCard, creditCard, eWallet] = await AccountType.create(
    {
      user: user1._id,
      title: 'Wallet',
      image: "fixtures/wallet.jpeg",
    }, {
      user: user1._id,
      title: 'Bank Card',
      image: "fixtures/card.png",
    }, {
      user: user2._id,
      title: 'Credit card',
      image: "fixtures/card.png",
    }, {
      user: user2._id,
      title: 'E-Wallet',
      image: "fixtures/wallet.jpeg",
    },);

  const [user1Account1, user1Account2, user2Account1, user2Account2] = await Account.create(
    {
      user: user1._id,
      accountType: wallet._id,
      title: 'E-money',
      amount: 10000,
      createdAt: new Date(),
    }, {
      user: user1._id,
      accountType: bankCard._id,
      title: 'M bank',
      amount: 20000,
      createdAt: new Date(),
    }, {
      user: user2._id,
      accountType: creditCard._id,
      title: 'Demir bank',
      amount: 30000,
      createdAt: new Date(),
    }, {
      user: user2._id,
      accountType: eWallet._id,
      title: 'PayPal',
      amount: 40000,
      createdAt: new Date(),
    });

  const [food, drink, salary, gift] = await Category.create(
    {
      user: user1._id,
      title: 'Food',
      type: 'expenses'
    }, {
      user: user1._id,
      title: 'Drink',
      type: 'expenses'
    },  {
      user: user1._id,
      title: 'Salary',
      type: 'income'
    }, {
      user: user1._id,
      title: 'Gift',
      type: 'income'
    },
    {
      user: user2._id,
      title: 'Food',
      type: 'expenses'
    }, {
      user: user2._id,
      title: 'Drink',
      type: 'expenses'
    },  {
      user: user2._id,
      title: 'Salary',
      type: 'income'
    }, {
      user: user2._id,
      title: 'Gift',
      type: 'income'
    });

  await db.close();
};

run().catch(console.error);