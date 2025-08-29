import { Router } from "express";
import ProfileControllers from "../controllers/ProfileControllers";
import AuthMiddleware from "@shared/middlewares/AuthMiddleware";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema";

const profileRouter = Router();
const profileController = new ProfileControllers();

profileRouter.use(AuthMiddleware.execute);
profileRouter.get("/", profileController.show);
profileRouter.patch("/:id", UpdateUserSchema, profileController.update);

export default profileRouter;
