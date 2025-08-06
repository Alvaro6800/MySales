import fs from "fs";
import path from "path";

import upload from "@config/upload";

import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";

interface IUpdateUserAvatar {
  userId: number;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFilename }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(userId);

    if (!user) throw new AppError("User not found", 404);

    if (user.avatar) {
      // Monta o caminho do arquivo
      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      // Verifica se o arquivo existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await usersRepositories.save(user);
    return user;
  }
}
