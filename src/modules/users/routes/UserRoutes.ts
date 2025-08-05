import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";

const usersRouter = Router();
const usersController = new UsersControllers();

usersRouter.get("/", usersController.index);
usersRouter.get("/:id", usersController.show);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

export default usersRouter;
