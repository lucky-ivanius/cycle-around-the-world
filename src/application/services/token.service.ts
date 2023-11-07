export interface Claims {
  sub: string;
  username: string;
}

export type Token = string;

export interface TokenService {
  sign(claims: Claims): Promise<Token>;
  verify(token: Token): Promise<Claims>;
}
