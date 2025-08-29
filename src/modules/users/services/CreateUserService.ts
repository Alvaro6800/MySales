import AppError from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { User } from "../infra/database/entities/User";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const userExists = await usersRepositories.findByEmail(email);

    if (userExists)
      throw new AppError("There is already one user with this email", 409);

    const hashedPassword = await hash(password, 10);

    const user = usersRepositories.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepositories.save(user);

    return user;
  }
}
