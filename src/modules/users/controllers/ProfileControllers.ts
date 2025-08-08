import { Request, Response } from "express";
import UpdateProfileService from "../services/UpdateProfileService";
import ShowProfileService from "../services/ShowProfileService";

export default class ProfileControllers {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user.id);
    const updateProfileService = new ShowProfileService();

    const user = await updateProfileService.execute({ user_id });

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, actualPassword, newPassword } = request.body;
    const user_id = Number(request.user.id);
    const updateProfileService = new UpdateProfileService();

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      actualPassword,
      newPassword,
    });

    return response.json(user);
  }
}
