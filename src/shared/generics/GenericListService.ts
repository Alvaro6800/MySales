import { IPagination } from "@shared/interfaces/PaginationInterface";
import RedisCache from "@shared/cache/RedisCache";
import { ObjectLiteral, Repository } from "typeorm";

interface IListServiceOptions {
  cacheKey: string;
  page: number | 1;
  limit: number | 10;
}

export default class ListService<T extends ObjectLiteral> {
  constructor(private repository: Repository<T>) {}

  async execute({
    cacheKey,
    page = 1,
    limit = 10,
  }: IListServiceOptions): Promise<IPagination<T>> {
    const redisCache = new RedisCache();
    const cacheFullKey = `${cacheKey}-page-${page}-limit-${limit}`;

    let result = await redisCache.recover<IPagination<T>>(cacheFullKey);

    if (!result) {
      const [data, total] = await this.repository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });

      const totalPages = Math.ceil(total / limit);

      result = {
        data,
        total,
        per_page: limit,
        current_page: page,
        total_pages: totalPages,
        next_page: page < totalPages ? page + 1 : null,
        previous_page: page > 1 ? page - 1 : null,
      };

      await redisCache.save(cacheFullKey, JSON.stringify(result));
    }

    return result;
  }
}
