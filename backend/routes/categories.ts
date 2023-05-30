import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import Category from "../models/Category";

const categoriesRouter = express.Router();

categoriesRouter.get('/', auth, async (req, res, next) => {
  try {
    const categories = await Category.find();

    return res.send(categories);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

categoriesRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const categories = await Category.findById(req.params.id);

    return res.send(categories);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

categoriesRouter.post('/', auth, async (req, res, next) => {
  try {
    const newCategory = await Category.create({
      title: req.body.title,
      type: req.body.type,
    });

    return res.send({message: 'Category added', category: newCategory});

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

categoriesRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const result = await Category.deleteOne({_id: req.params.id});

    if (result.deletedCount) {
      return res.send({message: 'Category removed'});
    } else {
      res.status(403).send({message: 'Forbidden'});
    }
  } catch (e) {
    next(e);
  }
});

categoriesRouter.patch('/:id', auth, async (req, res) => {
  try {
    const category = await Category.updateOne({_id: req.params.id}, {
      $set: {
        title: req.body.title,
      },
    });

    if (category.modifiedCount < 1) {
      res.status(404).send({message: 'Cant find Category'});
    } else {
      res.send({category, message: 'Category was updated'});
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default categoriesRouter;