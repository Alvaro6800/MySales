import AppError from "@shared/errors/AppError";
import { customersRepositories } from "../infra/database/repositories/CustomersRepositories";
import { Customer } from "../infra/database/entities/Customer";

interface ICreateCustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const customerExists = await customersRepositories.findByEmail(email);

    if (customerExists) throw new AppError("Email address already used", 409);

    const customer = customersRepositories.create({
      name,
      email,
    });

    await customersRepositories.save(customer);

    return customer;
  }
}
