import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { Request, Response } from "express";

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
