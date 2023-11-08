import { compare, genSalt, hash } from 'bcrypt';
import { HashingService } from '../../application/services/hashing.service';

export class BcryptHashingService implements HashingService {
  public constructor(private readonly saltOrRounds?: string | number) {}

  async hash(value: string): Promise<string> {
    const saltOrRounds = this.saltOrRounds ?? (await genSalt());
    const hashedValue = await hash(value, saltOrRounds);

    return hashedValue;
  }

  async compare(value: string, hashValue: string): Promise<boolean> {
    const result = await compare(value, hashValue);

    return result;
  }
}
