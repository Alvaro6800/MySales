import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";

interface IUpdateUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export default class ShowUserService {
  public async execute({
    id,
    name,
    email,
    password,
    avatar,
  }: IUpdateUser): Promise<User> {
    const user = await usersRepositories.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userExists = await usersRepositories.findByEmail(email);

    if (userExists) {
      throw new AppError("There is already one user with this email", 400);
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;

    await usersRepositories.save(user);

    return user;
  }
}
