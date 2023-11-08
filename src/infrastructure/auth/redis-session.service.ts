import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from '@redis/client';
import { SessionService } from '../../application/services/session.service';
import { Claims, TokenService } from '../../application/services/token.service';

type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

export class RedisSessionService implements SessionService {
  private readonly defaultExpiryHours = 24;

  public constructor(
    private readonly redisClient: RedisClient,
    private readonly tokenService: TokenService
  ) {}

  async isSessionActive(token: string): Promise<boolean> {
    const payload = await this.tokenService.verify(token);

    if (!payload) return false;

    const session = await this.redisClient.exists(token);

    return !!session;
  }

  async getSessionUserId(token: string): Promise<string | null> {
    const payload = await this.tokenService.verify(token);

    if (!payload) return null;

    const session = await this.redisClient.get(token);

    return session;
  }

  async createSession(claims: Claims, expiryHours?: number): Promise<string> {
    const token = await this.tokenService.sign(
      claims,
      expiryHours ?? this.defaultExpiryHours
    );

    await this.redisClient.setEx(
      token,
      (expiryHours ?? this.defaultExpiryHours) * 60 * 60,
      claims.sub
    );

    return token;
  }

  async removeSession(token: string): Promise<void> {
    await this.redisClient.del(token);
  }

  async clearAllSession(): Promise<void> {
    const keys = await this.redisClient.keys('*');

    await this.redisClient.del(keys);
  }
}
