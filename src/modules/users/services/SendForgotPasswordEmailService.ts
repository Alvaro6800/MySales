import AppError from "@shared/errors/AppError";
import { sendEmail } from "@config/email";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { userTokensRepositories } from "../infra/database/repositories/UserTokensRepositories";

interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) throw new AppError("User not Found.", 404);

    const token = await userTokensRepositories.generate(user.id);

    if (!token) throw new AppError("Error generating token.", 500);

    sendEmail({
      to: email,
      subject: "Recuperação de senha",
      body: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center;, border: 2px solid #041d40; border-radius: 10px; margin: auto; width: 60%">
        <h1 style="color: #041d40;">Password Reset Verification Code</h1>
        <h3 style="color: #041d40;">Dear ${user.name}:</h3>
        <p style="font-size: 16px; color: #333">Recover your password with this token:</p>
        <p>
          <strong style="border: 2px dashed #041d40; padding: 10px; border-radius: 5px; font-size: 16px; color: #041d40;"> ${token?.token} </strong>
        </p>
        </div>
      `,
    });
  }
}
