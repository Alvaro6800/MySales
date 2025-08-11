import AppError from "@shared/errors/AppError";
import { Customer } from "../database/entities/Customer";
import { customersRepositories } from "../database/repositories/CustomersRepositories";

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customersRepositories.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    return customer;
  }
}
