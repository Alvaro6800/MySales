import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcrypt";
import { User } from "../infra/database/entities/User";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";

interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  actualPassword: string;
  newPassword: string;
}

export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    actualPassword,
    newPassword,
  }: IUpdateProfile): Promise<User> {
    const user = await usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (email) {
      const userExists = await usersRepositories.findByEmail(email);

      if (userExists && userExists.id != user_id) {
        throw new AppError("There is already one user with this email", 409);
      }

      user.email = email;
    }

    if (newPassword && !actualPassword) {
      throw new AppError(
        "You need to inform the actual password to set a new one",
      );
    }

    if (actualPassword && newPassword) {
      const passwordConfirmed = await compare(actualPassword, user.password);

      if (!passwordConfirmed) {
        throw new AppError("Incorrect actual password", 401);
      }

      user.password = await hash(newPassword, 10);
    }

    if (name) {
      user.name = name;
    }

    await usersRepositories.save(user);

    return user;
  }
}
