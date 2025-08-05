import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";

export default class UsersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUserService();
    const users = await listUsersService.execute();

    return response.json(users);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUsersService = new ShowUserService();
    const user = await showUsersService.execute({ id });
    return response.json(user);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });
    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, avatar } = request.body;
    const updateUserService = new UpdateUserService();
    const user = await updateUserService.execute({
      id,
      name,
      email,
      password,
      avatar,
    });
    return response.json(user);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute({ id });
    return response.status(204).send([]);
  }
}
