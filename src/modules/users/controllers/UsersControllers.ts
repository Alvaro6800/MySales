import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";

export default class UsersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUserService();
    const Users = await listUsersService.execute();

    return response.json(Users);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUsersService = new ShowUserService();
    const User = await showUsersService.execute({ id });
    return response.json(User);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;
    const createUserService = new CreateUserService();
    const User = await createUserService.execute({
      name,
      email,
      password,
      avatar,
    });
    return response.json(User);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password, avatar } = request.body;
    const updateUserService = new UpdateUserService();
    const User = await updateUserService.execute({
      id,
      name,
      email,
      password,
      avatar,
    });
    return response.json(User);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute({ id });
    return response.status(204).send([]);
  }
}
