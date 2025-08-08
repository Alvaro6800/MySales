import { celebrate, Joi, Segments } from "celebrate";

export const UpdateUserSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    actualPassword: Joi.string().optional(),
    newPassword: Joi.string().uri().optional(),
    newPasswordConfirmation: Joi.string()
      .valid(Joi.ref("newPassword"))
      .when("newPassword", { is: Joi.exist(), then: Joi.required() }),
  }),
});
