import { Prisma, PrismaClient } from '@prisma/client';
import {
  AuthService,
  Credential,
} from '../../application/services/auth.service';
import { HashingService } from '../../application/services/hashing.service';
import { UniqueId } from '../../core/common/domain/unique-id';
import { User } from '../../core/entities/user/user';
import { Username } from '../../core/entities/user/username';

type PrismaUser = Prisma.UserGetPayload<object>;

export class PrismaAuthService implements AuthService {
  public constructor(
    private readonly prismaClient: PrismaClient,
    private readonly hashingService: HashingService
  ) {}

  private mapUserToDomain(prismaUser: PrismaUser): User {
    const id = new UniqueId(prismaUser.id);
    const username = Username.create({ value: prismaUser.username }).getData();

    const user = User.create(
      {
        username,
      },
      id
    ).getData();

    return user;
  }

  async authenticate(credential: Credential): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        username: credential.username,
      },
    });

    if (!user) return null;

    const comparePassword = await this.hashingService.compare(
      credential.password,
      user.password
    );

    if (!comparePassword) return null;

    return this.mapUserToDomain(user);
  }

  async isUserExists(username: string): Promise<boolean> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        username,
      },
    });

    return !!user;
  }

  async register(credential: Credential): Promise<void> {
    const password = await this.hashingService.hash(credential.password);

    await this.prismaClient.user.create({
      data: {
        username: credential.username,
        password: password,
      },
    });
  }
}
