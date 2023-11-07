import { UniqueId } from '../../core/common/domain/unique-id';
import { User } from '../../core/entities/user/user';
import { Token } from './token.service';

export interface SessionService {
  getUserByToken(token: Token): Promise<User>;
  createSession(user: User, expiryHours?: number): Promise<Token>;
  removeSession(userId: UniqueId): Promise<void>;
  clearAllSession(): Promise<void>;
}
