import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose, {Types} from "mongoose";
import Transaction from "../models/Transaction";
import Account from "../models/Account";
import Category from "../models/Category";

const transactionsRouter = express.Router();

transactionsRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const transactions = await Transaction.find({user: user._id}).populate('account');
    return res.send(transactions);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

transactionsRouter.get('/search', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const queryStartDate = new Date(req.query.start as string);
    const queryEndDate = new Date(req.query.end as string);
    const category = req.query.category;
    const account = req.query.account;

    const result = await Transaction.aggregate([
      {
        $match: {
          user: new Types.ObjectId(user._id),
          createdAt: {
            $gte: queryStartDate,
            $lte: queryEndDate,
          },
          category: new Types.ObjectId(category as string),
          account: new Types.ObjectId(account as string),
        },
      },
      {
        $addFields: {
          dateString: {$dateToString: {format: '%d.%m.%Y', date: '$createdAt', timezone: 'GMT'}},
        },
      },
      {
        $group: {
          _id: {
            dateString: '$dateString',
            type: {
              $cond: [{$eq: ['$category', new Types.ObjectId(category as string)]}, 'income', 'expenses']
            },
          },
          amount: {$sum: '$sum'},
        },
      },
      {
        $group: {
          _id: '$_id.dateString',
          date: {$first: '$_id.dateString'},
          KGS: {
            $sum: {
              $cond: [{$eq: ['$_id.type', 'income']}, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: {$dateFromString: {dateString: '$date', format: '%d.%m.%Y', timezone: 'GMT'}},
          KGS: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
      {
        $project: {
          date: {$dateToString: {format: '%d.%m.%Y', date: '$date', timezone: 'GMT'}},
          KGS: 1,
        },
      },
    ]);

    return res.send(result);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

transactionsRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const transactions = await Transaction.find({
      user: user._id,
      account: req.params.id
    }).sort({createdAt: 1}).populate('account').populate('category').sort({createdAt: -1});
    return res.send(transactions);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

transactionsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const dayjs = require('dayjs');
    const utc = require('dayjs/plugin/utc');
    dayjs.extend(utc);

    const newTransaction = await new Transaction({
      user: user._id,
      account: req.body.account,
      category: req.body.category,
      sum: parseInt(req.body.sum),
      createdAt: dayjs.utc(req.body.createdAt).toDate(),
      comment: req.body.comment,
    });

    const existingCategory = await Category.findById(req.body.category);

    if (existingCategory?.type === 'income') {
      await Account.findOneAndUpdate(
        {_id: req.body.account},
        {$inc: {amount: +req.body.sum}})
    } else {
      const existingAccount = await Account.findById(req.body.account);

      if (existingAccount && (existingAccount.amount < req.body.sum)) {
        return res.status(403).send({message: 'You have insufficient funds in your account.'})
      }
      await Account.findOneAndUpdate(
        {_id: req.body.account},
        {$inc: {amount: -req.body.sum}})
    }

    newTransaction.save();

    return res.send({message: 'Transaction added', transaction: newTransaction});

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

transactionsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const existingTransaction = await Transaction.findById(req.params.id);
    if (existingTransaction) {
      const existingAccount = await Account.findById(existingTransaction.account)
      const existingCategory = await Category.findById(existingTransaction.category);

      if (existingCategory?.type === 'income') {
        await Account.findOneAndUpdate(
          {_id: existingAccount?._id},
          {$inc: {amount: -existingTransaction.sum}})
      } else {
        await Account.findOneAndUpdate(
          {_id: existingAccount?._id},
          {$inc: {amount: +existingTransaction.sum}})
      }
    }
    const result = await Transaction.deleteOne({_id: req.params.id, user: user._id});

    if (result.deletedCount) {
      return res.send({message: 'Transaction removed'});
    } else {
      res.status(403).send({message: 'Forbidden'});
    }
  } catch (e) {
    next(e)
  }
});


export default transactionsRouter;