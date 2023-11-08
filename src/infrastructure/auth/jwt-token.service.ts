import { sign, verify } from 'jsonwebtoken';
import {
  Claims,
  Token,
  TokenService,
} from '../../application/services/token.service';

export class JwtTokenService implements TokenService {
  private readonly defaultExpiryHours = 24;

  public constructor(private readonly secretKey: string) {}

  async sign(claims: Claims, expiryHours?: number): Promise<Token> {
    const token = sign(claims, this.secretKey, {
      expiresIn: `${expiryHours ?? this.defaultExpiryHours}h`,
    });

    return token;
  }

  async verify(token: Token): Promise<Claims | null> {
    try {
      const claims = verify(token, this.secretKey);

      if (!claims) return null;

      return claims as Claims;
    } catch {
      return null;
    }
  }
}
