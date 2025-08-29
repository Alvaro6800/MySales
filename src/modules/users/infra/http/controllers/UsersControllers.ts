import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import ListUserService from "@modules/users/services/ListUserService";
import CreateUserService from "@modules/users/services/CreateUserService";
import DeleteUserService from "@modules/users/services/DeleteUserService";

export default class UsersControllers {
  async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUserService();
    const users = await listUsersService.execute();

    return response.json(instanceToInstance(users));
  }

  //async show(request: Request, response: Response): Promise<Response> {
  //  const { id } = request.params;
  //  const showUsersService = new ShowUserService();
  //  const user = await showUsersService.execute({ user_id: Number(id) });
  //  return response.json(user);
  //}

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });
    return response.json(instanceToInstance(user));
  }

  // async update(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const { name, email, actualPassword, newPassword, avatar } = request.body;
  //   const updateUserService = new UpdateUserService();
  //   const user = await updateUserService.execute({
  //     user_id: Number(id),
  //     name,
  //     email,
  //     actualPassword,
  //     newPassword,
  //   });
  //   return response.json(user);
  // }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUserService = new DeleteUserService();
    await deleteUserService.execute({ id });
    return response.status(204).send([]);
  }
}
