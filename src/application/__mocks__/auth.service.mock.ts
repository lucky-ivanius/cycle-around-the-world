import { AuthService } from '../services/auth.service';

export function getAuthServiceMock(custom?: Partial<AuthService>): AuthService {
  return {
    authenticate: jest.fn(),
    isUserExists: jest.fn(),
    register: jest.fn(),
    ...custom,
  };
}
