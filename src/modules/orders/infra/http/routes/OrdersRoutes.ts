import { Router } from "express";
import OrdersController from "../controllers/OrdersControllers";
import AuthMiddleware from "@shared/middlewares/AuthMiddleware";
import { createOrderSchema, idParamValidation } from "../schemas/OrdersSchemas";

const orderRoutes = Router();
const orderController = new OrdersController();

orderRoutes.use(AuthMiddleware.execute);

orderRoutes.get("/:id", idParamValidation, orderController.show);
orderRoutes.post("/", createOrderSchema, orderController.create);

export default orderRoutes;
