import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import AccountType from "../models/AccountType";
import Account from "../models/Account";

const accountTypesRouter = express.Router();

accountTypesRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const accountTypes = await AccountType.find({user: user._id});

    return res.send(accountTypes);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

accountTypesRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const accountTypes = await AccountType.findOne({_id: req.params.id, user: user._id});

    return res.send(accountTypes);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

accountTypesRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (user) {
      const newAccountType = await AccountType.create({
        user: user._id,
        title: req.body.title,
        image: req.file && req.file.filename,
      });

      return res.send({message: 'Account type added', accountType: newAccountType});
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

accountTypesRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const accountType = await AccountType.findOne({_id: req.params.id, user: user._id});
    const account = await Account.find({accountType: accountType?._id, user: user._id});

    if (account.length) {
      return res.status(403).send({message: 'First delete all accounts with this type'})
    }

    const result = await AccountType.deleteOne({_id: req.params.id});

    if (result.deletedCount) {
      return res.send({message: 'Account type removed'});
    } else {
      res.status(403).send({message: 'Forbidden'});
    }
  } catch (e) {
    next(e)
  }
});

accountTypesRouter.patch('/:id', auth, imagesUpload.single('image'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const accountType = await AccountType.updateOne({_id: req.params.id, user: user._id}, {
      $set: {
        title: req.body.title,
        image: req.file && req.file.filename,
      },
    });

    if (accountType.modifiedCount < 1) {
      res.status(404).send({message: 'Cant find Account type'});
    } else {
      res.send({accountType, message: 'Account type was updated'});
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default accountTypesRouter;