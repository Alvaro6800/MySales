import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchema } from "../schemas/SessionSchemas";

const sessionsRouter = Router();
const sessionsController = new SessionsControllers();

sessionsRouter.post("/", sessionSchema, sessionsController.session);

export default sessionsRouter;
