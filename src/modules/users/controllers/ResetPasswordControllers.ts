import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordServcice = new ResetPasswordService();

    await resetPasswordServcice.execute({ token, password });

    return response.status(204).json({});
  }
}
