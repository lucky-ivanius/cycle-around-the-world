export interface Claims {
  sub: string;
  username: string;
}

export type Token = string;

export interface TokenService {
  sign(claims: Claims, expiryHours?: number): Promise<Token>;
  verify(token: Token): Promise<Claims>;
}
