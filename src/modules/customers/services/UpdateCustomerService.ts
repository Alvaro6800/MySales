import AppError from "@shared/errors/AppError";
import { Customer } from "../database/entities/Customer";
import { customersRepositories } from "../database/repositories/CustomersRepositories";

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const costumer = await customersRepositories.findById(id);

    if (!costumer) {
      throw new AppError("Customer not found", 404);
    }

    const customerExists = await customersRepositories.findByEmail(email);

    if (customerExists && customerExists.email != email) {
      throw new AppError("There is already one customer with this email", 400);
    }

    costumer.name = name;
    costumer.email = email;

    await customersRepositories.save(costumer);

    return costumer;
  }
}
