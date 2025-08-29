import AppError from "@shared/errors/AppError";
import { orderRepositories } from "../infra/database/repositories/OrderRepositories";
import { Order } from "../infra/database/entities/Orders";

interface IShowOrder {
  id: string;
}

export class ShowOrderService {
  async execute({ id }: IShowOrder): Promise<Order> {
    const order = await orderRepositories.findById(Number(id));

    if (!order) throw new AppError("Order not found");

    return order;
  }
}
