import { User } from '../../core/entities/user/user';

export interface Credential {
  username: string;
  password: string;
}

export interface AuthService {
  authenticate(credential: Credential): Promise<User | null>;
  isUserExists(username: string): Promise<boolean>;
  register(credential: Credential): Promise<void>;
}
