import AppError from "@shared/errors/AppError";
import { Order } from "../database/entities/Orders";
import { orderRepositories } from "../database/repositories/OrderRepositories";

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
