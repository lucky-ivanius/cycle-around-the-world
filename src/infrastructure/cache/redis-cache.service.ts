import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from '@redis/client';
import { CacheService } from '../services/cache.service';

type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

export class RedisCacheService implements CacheService {
  private readonly defaultExpiryHours = 1;

  public constructor(private readonly redisClient: RedisClient) {}

  async create(
    key: string,
    value: string,
    expiryHours?: number
  ): Promise<void> {
    await this.redisClient.setEx(
      key,
      (expiryHours ?? this.defaultExpiryHours) * 60 * 60,
      value
    );
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async exists(keys: string[]): Promise<boolean> {
    const count = await this.redisClient.exists(keys);

    return !!count;
  }

  async parseFromObjectValue<T extends object>(value: T): Promise<string> {
    return JSON.stringify(value);
  }

  async parseToObjectValue<T extends object>(value: string): Promise<T> {
    return JSON.parse(value);
  }

  async delete(keys: string[]): Promise<void> {
    await this.redisClient.del(keys);
  }

  async clear(): Promise<void> {
    const keys = await this.redisClient.keys('*');

    await this.redisClient.del(keys);
  }
}
