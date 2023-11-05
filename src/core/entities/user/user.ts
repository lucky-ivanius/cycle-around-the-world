import { Entity } from '../../common/domain/entity';
import { UniqueId } from '../../common/domain/unique-id';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';
import { Username } from './username';

export interface UserProps {
  username: Username;
}

export class User implements Entity<UserProps> {
  get username() {
    return this.props.username;
  }

  private constructor(
    private readonly props: UserProps,
    public readonly id: UniqueId
  ) {}

  public static create(props: UserProps, id?: UniqueId): Result<User> {
    const propsGuards = [
      Guard.required({ arg: Username.name, value: props.username }),
    ];

    const propsGuardResult = Result.combine(...propsGuards);
    if (!propsGuardResult.success) return propsGuardResult as Result<User>;

    const user = new User(props, id ?? new UniqueId());

    return Result.ok(user);
  }
}
