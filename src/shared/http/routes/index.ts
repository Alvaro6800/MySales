import productsRouter from "@modules/products/routes/ProductRoutes";
import usersRouter from "@modules/users/routes/UserRoutes";
import { Router } from "express";

const routes = Router();

routes.get("/health", (req, res) => {
  return res.json({ message: "Hello Dev! I'm Alive" });
});

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);

export default routes;
