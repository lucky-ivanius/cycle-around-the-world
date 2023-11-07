import { Prisma, PrismaClient } from '@prisma/client';
import { UniqueId } from '../../../core/common/domain/unique-id';
import { User } from '../../../core/entities/user/user';
import { Username } from '../../../core/entities/user/username';
import { UsersRepository } from '../../../core/repositories/users.repository';

type PrismaUser = Prisma.UserGetPayload<object>;

export class PrismaUsersRepository implements UsersRepository {
  public constructor(private readonly prismaClient: PrismaClient) {}

  private mapUserToDomain(prismaUser: PrismaUser): User {
    const username = Username.create({ value: prismaUser.username }).getData();

    const user = User.create({
      username,
    }).getData();

    return user;
  }

  async getUserById(userId: UniqueId): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id: userId.toString(),
      },
    });

    if (!user) return null;

    return this.mapUserToDomain(user);
  }
}
