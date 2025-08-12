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

    if (email) {
      const customerExists = await customersRepositories.findByEmail(email);

      console.log(customerExists?.email, email);

      if (customerExists && customerExists.email !== email) {
        throw new AppError(
          "There is already one customer with this email",
          400,
        );
      }

      costumer.email = email;
    }

    costumer.name = name ? name : costumer.name;

    await customersRepositories.save(costumer);

    return costumer;
  }
}
