import productsRouter from "@modules/products/routes/ProductRoutes";
import avatarRouter from "@modules/users/routes/AvatarRoutes";
import sessionsRouter from "@modules/users/routes/SessionRoutes";
import usersRouter from "@modules/users/routes/UserRoutes";
import passwordRouter from "@modules/users/routes/PasswordRoutes";
import express, { Router } from "express";
import uploadConfig from "@config/upload";

const routes = Router();

routes.get("/health", (req, res) => {
  return res.json({ message: "Hello Dev! I'm Alive" });
});

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/avatar", avatarRouter);
routes.use("/files", express.static(uploadConfig.directory));
routes.use("/password", passwordRouter);

export default routes;
