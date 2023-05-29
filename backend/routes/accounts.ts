import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Account from "../models/Account";
import Transaction from "../models/Transaction";

const accountsRouter = express.Router();

accountsRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const accounts = await Account.find({user: user._id}).populate('accountType');
    return res.send(accounts);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

accountsRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.id);
    return res.send(account);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

accountsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const newAccount = await Account.create({
      user: user._id,
      accountType: req.body.accountType,
      title: req.body.title,
      amount: req.body.amount,
      createdAt: new Date(),
    });

    return res.send({message: 'Account added', account: newAccount});

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

accountsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const result = await Account.deleteOne({_id: req.params.id, user: user._id});

    if (result.deletedCount) {
      await Transaction.deleteMany({account: req.params.id});
      return res.send({message: 'Account removed'});
    } else {
      res.status(403).send({message: 'Forbidden'});
    }
  } catch (e) {
    next(e)
  }
});

export default accountsRouter;