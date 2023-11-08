import { Claims, Token } from './token.service';

export interface SessionService {
  isSessionActive(token: Token): Promise<boolean>;
  getSessionUserId(token: Token): Promise<string | null>;
  createSession(claims: Claims, expiryHours?: number): Promise<Token>;
  removeSession(token: Token): Promise<void>;
  clearAllSession(): Promise<void>;
}
