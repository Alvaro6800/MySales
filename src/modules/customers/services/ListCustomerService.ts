import { Customer } from "../database/entities/Customer";
import { customersRepositories } from "../database/repositories/CustomersRepositories";

export default class ListCustomerService {
  async execute(): Promise<Customer[]> {
    const customers = await customersRepositories.find();

    return customers;
  }
}
