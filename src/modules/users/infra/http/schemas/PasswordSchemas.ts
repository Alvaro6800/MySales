import {celebrate, Joi, Segments} from "celebrate";

export const ForgotPasswordSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
});

export const ResetPasswordSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string().uuid().required(),
    password: Joi.string().min(6).required(),
    password_confirmation: Joi.string().valid(Joi.ref("password")).required(),
  }),
});
