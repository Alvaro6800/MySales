import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";

export default class UpdateAvatarControllers {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: Number(request.user.id),
      avatarFilename: request.file?.filename as string,
    });

    return response.json(user);
  }
}
