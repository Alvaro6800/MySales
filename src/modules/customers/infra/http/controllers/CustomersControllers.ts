import { Request, Response } from "express";
import ListCustomerService from "@modules/customers/services/ListCustomerService";
import ShowCustomerService from "@modules/customers/services/ShowCustomerService";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";
import DeleteCustomerService from "@modules/customers/services/DeleteCustomerService";

export default class CustomersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const listCustomerService = new ListCustomerService();

    const customers = await listCustomerService.execute(page, limit);

    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const id = Number(request.params.id);

    const updateCustomerService = new UpdateCustomerService();

    const customer = await updateCustomerService.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return response.status(204).json([]);
  }
}
