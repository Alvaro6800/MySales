import { Router } from "express";
import UpdateAvatarControllers from "../controllers/UpdateAvatarControllers";
import multer from "multer";
import uploadConfig from "@config/upload";
import AuthMiddleware from "@shared/middlewares/AuthMiddleware";

const avatarRouter = Router();
const userAvatarRouter = new UpdateAvatarControllers();
const upload = multer(uploadConfig);

avatarRouter.patch(
  "/",
  AuthMiddleware.execute,
  upload.single("avatar"),
  userAvatarRouter.update,
);

export default avatarRouter;
