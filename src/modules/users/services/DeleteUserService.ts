import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";

interface IDeleteUser {
  id: string;
}

export default class DeleteUserService {
  async execute({ id }: IDeleteUser): Promise<void> {
    const user = await usersRepositories.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await usersRepositories.remove(user);
  }
}
