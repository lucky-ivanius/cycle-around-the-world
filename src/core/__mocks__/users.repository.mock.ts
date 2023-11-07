import { UsersRepository } from '../repositories/users.repository';

export function getUsersRepositoryMock(
  custom?: Partial<UsersRepository>
): UsersRepository {
  return {
    getUserById: jest.fn(),
    ...custom,
  };
}
