import { celebrate, Joi, Segments } from "celebrate";

export const idParamValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export const createOrderSchema = celebrate({
  [Segments.BODY]: {
    customer_id: Joi.string().required(),
    products: Joi.required(),
  },
});
