import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import User from "./models/User";
import AccountType from "./models/AccountType";
import Account from "./models/Account";

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

  const [wallet, card] = await AccountType.create(
    {
      title: 'Wallet',
      image: "fixtures/wallet.jpeg",
    }, {
      title: 'Bank Card',
      image: "fixtures/card.png",
    }, {
      title: 'Credit Card',
      image: "fixtures/card.png",
    },);

  const [user1Account, user2Account] = await Account.create(
    {
      user: user1._id,
      accountType: wallet._id,
      title: 'E-money',
      amount: 10000,
      createdAt: new Date(),
    }, {
      user: user1._id,
      accountType: card._id,
      title: 'RSK bank',
      amount: 20000,
      createdAt: new Date(),
    }, {
      user: user2._id,
      accountType: wallet._id,
      title: 'PayPal',
      amount: 10000,
      createdAt: new Date(),
    }, {
      user: user2._id,
      accountType: card._id,
      title: 'Demir bank',
      amount: 20000,
      createdAt: new Date(),
    });

  await db.close();
};

run().catch(console.error);