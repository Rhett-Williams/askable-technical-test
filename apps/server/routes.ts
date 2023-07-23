import { Database } from "./data/Database";

import express from "express";
const router = express.Router();
import { celebrate, Joi, Segments } from "celebrate";

const handleErrors = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  let statusCode = 500;
  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  console.error(err);
  res.status(statusCode).json({ error: err.message });
};

const validationSchemas = {
  validateGetProducts: celebrate({
    body: Joi.object({
      sortedBy: Joi.string()
        .valid("CreateDate", "Price")
        .allow(null, "")
        .optional(),
    }),
  }),
  validateGetOneProduct: celebrate({
    body: Joi.object({
      productId: Joi.string().required(),
    }),
  }),
  validateCreateProduct: celebrate({
    body: Joi.object({
      title: Joi.string().required(),
      created_at: Joi.string().required(),
      category: Joi.string()
        .valid("Clothing", "Hats", "Sneakers", "Watches")
        .allow(null, "")
        .optional(),
      price: Joi.string().required(),
    }),
  }),
  validateDeleteProduct: celebrate({
    body: Joi.object({
      productId: Joi.string().required(),
    }),
  }),
  validateGetOrder: celebrate({
    body: Joi.object({
      orderId: Joi.string().required(),
    }),
  }),
  validateCreateOrder: celebrate({
    body: Joi.object({
      productId: Joi.string().required(),
    }),
  }),
};

router.post(
  "/getProducts",
  validationSchemas.validateGetProducts,
  async (req, res) => {
    console.log("asd", req.body)
    res.send(await Database.getProducts(req.body.sortedBy));
  }
);
router.post(
  "/getOneProduct",
  validationSchemas.validateGetOneProduct,
  async (req, res) => {

    res.send(await Database.getOneProduct(req.body.productId));
  }
);
router.post(
  "/createProduct",
  validationSchemas.validateCreateProduct,
  async (req, res) => {
    res.send(await Database.createProduct(req.body));
  }
);
router.post(
  "/deleteProduct",
  validationSchemas.validateDeleteProduct,
  async (req, res) => {
    res.send(await Database.deleteProduct(req.body.productId));
  }
);
router.post(
  "/getOrder",
  validationSchemas.validateGetOrder,
  async (req, res) => {
    res.send(await Database.getOrder(req.body.orderId));
  }
);
router.post(
  "/createOrder",
  validationSchemas.validateCreateOrder,
  async (req, res) => {
    res.send(await Database.createOrder(req.body.productId));
  }
);

router.use(handleErrors);

export default router;
