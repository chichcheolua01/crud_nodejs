import Joi from "joi";
import product from "../models/product";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
  status: Joi.boolean().required(),
  quantity: Joi.number().required(),
});

export const create = async (req, res) => {
  const body = req.body;
  try {
    const { error } = productSchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({ message: errors });
    } else {
      const data = await product.create(body);
      return res.status(200).json({ message: "Product created!", data });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await product.find();
    if (data.length === 0) {
      return res.status(400).json({ message: "No product was found!" });
    } else {
      return res.status(200).json({ message: "Product was found!", data });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const data = product.findOne({ _id: id });
    if (!data) {
      return res.status(400).json({ message: "No product was found!" });
    } else {
      const removeData = product.deleteOne({ _id: id });
      return res.status(200).json({ message: "Product removed!" });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const { error } = productSchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({ message: errors });
    } else {
      const newData = await product.findOneAndUpdate(id, body, { new: true });
      return res.status(200).json({ message: "Product updated!", newData });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};

export const get = async (req, res) => {
  const id = req.params.id;
  const data = await product.findOne({ _id: id });
  try {
    if (!data) {
      return res.status(400).json({ message: "No product was found!" });
    } else {
      return res.status(200).json({ message: "Product found!", data });
    }
  } catch (error) {
    return res.json({ message: error });
  }
};
