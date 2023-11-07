import { UniqueId } from '../common/domain/unique-id';
import { User } from '../entities/user/user';

export interface UsersRepository {
  getUserById(userId: UniqueId): Promise<User | null>;
}
