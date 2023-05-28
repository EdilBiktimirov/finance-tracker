import express from "express";
import * as mongoose from "mongoose";
import cors from "cors";
import config from "./config";
import usersRouter from "./routes/users";
import accountsRouter from "./routes/accounts";
import accountTypesRouter from "./routes/accountTypes";
import transactionsRouter from "./routes/transactions";
import categoriesRouter from "./routes/categories";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/account-types', accountTypesRouter);
app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);


