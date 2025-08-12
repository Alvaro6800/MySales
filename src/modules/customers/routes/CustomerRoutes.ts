import { Router } from "express";
import CustomersControllers from "../controllers/CustomersControllers";
import AuthMiddleware from "@shared/middlewares/AuthMiddleware";
import {
  createCustomerSchema,
  idParamsValidation,
  updateCustomerSchema,
} from "../schemas/CustomerSchemas";

const customerRoutes = Router();
const customersControllers = new CustomersControllers();

customerRoutes.use(AuthMiddleware.execute);
customerRoutes.get("/", customersControllers.index);
customerRoutes.get("/:id", idParamsValidation, customersControllers.show);
customerRoutes.post("/", createCustomerSchema, customersControllers.create);
customerRoutes.patch("/:id", updateCustomerSchema, customersControllers.update);
customerRoutes.delete("/:id", idParamsValidation, customersControllers.delete);

export default customerRoutes;
