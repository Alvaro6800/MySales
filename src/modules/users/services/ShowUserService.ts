import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";

interface IShowUser {
  id: string;
}

export default class ShowUserService {
  public async execute({ id }: IShowUser): Promise<User> {
    const user = await usersRepositories.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}
