import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import AccountType from "../models/AccountType";
import {imagesUpload} from "../multer";

const accountTypesRouter = express.Router();

accountTypesRouter.get('/', auth, async (req, res, next) => {
  try {
    const accountTypes = await AccountType.find();

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
    const newAccountType = await AccountType.create({
      title: req.body.title,
      image: req.file && req.file.filename,
    });

    return res.send({message: 'Account type added', accountType: newAccountType});

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

accountTypesRouter.delete('/:id', auth, async (req, res, next) => {
  try {
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

export default accountTypesRouter;