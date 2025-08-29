import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { UserTokens } from "../entities/UserTokens";

export const userTokensRepositories = AppDataSource.getRepository(
  UserTokens,
).extend({
  async findByToken(token: string): Promise<UserTokens | null> {
    return this.findOneBy({ token });
  },
  async generate(user_id: number): Promise<UserTokens> {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  },
});
