import mongoose from 'mongoose';
import crypto from 'crypto';
import config from './config';
import User from "./models/User";
import AccountType from "./models/AccountType";
import Account from "./models/Account";
import Category from "./models/Category";
import Transaction from "./models/Transaction";

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
    displayName: "User1 Userovich",
    password: "123",
    token: crypto.randomUUID(),
    role: "user",
    avatar: 'fixtures/adminAvatar.png'
  }, {
    email: "user2@gmail.com",
    displayName: "User2 Userovich",
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
      amount: 30000,
      createdAt: new Date(),
    }, {
      user: user1._id,
      accountType: bankCard._id,
      title: 'M bank',
      amount: 40000,
      createdAt: new Date(),
    }, {
      user: user2._id,
      accountType: creditCard._id,
      title: 'Demir bank',
      amount: 50000,
      createdAt: new Date(),
    }, {
      user: user2._id,
      accountType: eWallet._id,
      title: 'PayPal',
      amount: 60000,
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
    }, {
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
    }, {
      user: user2._id,
      title: 'Salary',
      type: 'income'
    }, {
      user: user2._id,
      title: 'Gift',
      type: 'income'
    });

  await Transaction.create({
    user: user1._id,
    account: user1Account1._id,
    category: food._id,
    sum: 100,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: food._id,
    sum: 200,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: food._id,
    sum: 300,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: drink._id,
    sum: 110,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: drink._id,
    sum: 220,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: drink._id,
    sum: 320,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: salary._id,
    sum: 5000,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: salary._id,
    sum: 6000,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: salary._id,
    sum: 7000,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: gift._id,
    sum: 500,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: gift._id,
    sum: 1000,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account1._id,
    category: gift._id,
    sum: 700,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: food._id,
    sum: 100,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: food._id,
    sum: 200,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: food._id,
    sum: 300,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: drink._id,
    sum: 110,
    createdAt: '2023-05-29T16:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: drink._id,
    sum: 220,
    createdAt: '2023-05-31T17:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: drink._id,
    sum: 320,
    createdAt: '2023-06-01T18:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: salary._id,
    sum: 5000,
    createdAt: '2023-05-29T16:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: salary._id,
    sum: 6000,
    createdAt: '2023-05-31T17:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: salary._id,
    sum: 7000,
    createdAt: '2023-06-01T18:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: gift._id,
    sum: 500,
    createdAt: '2023-05-29T16:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: gift._id,
    sum: 1000,
    createdAt: '2023-05-31T17:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user1._id,
    account: user1Account2._id,
    category: gift._id,
    sum: 700,
    createdAt: '2023-06-01T18:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: food._id,
    sum: 100,
    createdAt: '2023-05-29T16:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: food._id,
    sum: 200,
    createdAt: '2023-05-31T17:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: food._id,
    sum: 300,
    createdAt: '2023-06-01T18:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: drink._id,
    sum: 110,
    createdAt: '2023-05-29T16:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: drink._id,
    sum: 220,
    createdAt: '2023-05-31T17:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: drink._id,
    sum: 320,
    createdAt: '2023-06-01T18:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: salary._id,
    sum: 5000,
    createdAt: '2023-05-29T16:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: salary._id,
    sum: 6000,
    createdAt: '2023-05-31T17:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: salary._id,
    sum: 7000,
    createdAt: '2023-06-01T18:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: gift._id,
    sum: 500,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: gift._id,
    sum: 1000,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account1._id,
    category: gift._id,
    sum: 700,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: food._id,
    sum: 100,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: food._id,
    sum: 200,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: food._id,
    sum: 300,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: drink._id,
    sum: 110,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: drink._id,
    sum: 220,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: drink._id,
    sum: 320,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: salary._id,
    sum: 5000,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: salary._id,
    sum: 6000,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: salary._id,
    sum: 7000,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: gift._id,
    sum: 500,
    createdAt: '2023-05-29T15:00:00.000+00:00',
    comment: 'Some comment1'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: gift._id,
    sum: 1000,
    createdAt: '2023-05-31T16:00:00.000+00:00',
    comment: 'Some comment2'
  }, {
    user: user2._id,
    account: user2Account2._id,
    category: gift._id,
    sum: 700,
    createdAt: '2023-06-01T17:00:00.000+00:00',
    comment: 'Some comment3'
  },)

  await db.close();
};

run().catch(console.error);