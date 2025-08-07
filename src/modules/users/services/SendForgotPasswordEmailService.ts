import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { userTokensRepositories } from "../database/repositories/UserTokensRepositories";

interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) throw new AppError("User not Found.", 404);

    const token = await userTokensRepositories.generate(user.id);

    if (!token) throw new AppError("Error generating token.", 500);

    console.log(token);
  }
}
