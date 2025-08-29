import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema, idParamsValidation } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/AuthMiddleware";
import { updateProductSchema } from "@modules/products/infra/http/schemas/ProductSchemas";

const usersRouter = Router();
const usersController = new UsersControllers();

usersRouter.get("/", AuthMiddleware.execute, usersController.index);
//usersRouter.get("/:id", idParamsValidation, usersController.show);
usersRouter.post("/", createUserSchema, usersController.create);
//usersRouter.put("/:id", updateProductSchema, usersController.update);
usersRouter.delete("/:id", idParamsValidation, usersController.delete);

export default usersRouter;
