import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { User } from "../infra/database/entities/User";
interface IShowProfile {
  user_id: number;
}

export default class ShowProfileService {
  public async execute({ user_id }: IShowProfile): Promise<User> {
    const user = await usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}
