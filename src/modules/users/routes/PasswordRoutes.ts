import { Router } from "express";
import ForgotPasswordControllers from "../controllers/ForgotPasswordControllers";
import ResetPasswordController from "../controllers/ResetPasswordControllers";
import { ForgotPasswordSchema, ResetPasswordSchema } from "../schemas/PasswordSchemas";

const passwordRouter = Router();
const forgotPasswordControllers = new ForgotPasswordControllers();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", ForgotPasswordSchema ,forgotPasswordControllers.create);
passwordRouter.post("/reset", ResetPasswordSchema,resetPasswordController.create);

export default passwordRouter;
