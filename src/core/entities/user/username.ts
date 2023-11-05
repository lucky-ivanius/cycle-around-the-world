import { ValueObject } from '../../common/domain/value-object';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 32;

export interface UsernameProps {
  value: string;
}

export class Username implements ValueObject<UsernameProps> {
  get value() {
    return this.props.value;
  }

  private constructor(private readonly props: UsernameProps) {
    Object.freeze(this);
  }

  public static create(props: UsernameProps): Result<Username> {
    const valueGuards = [
      Guard.required({ arg: Username.name, value: props.value }),
      Guard.minLength({
        arg: Username.name,
        value: props.value,
        length: MIN_USERNAME_LENGTH,
      }),
      Guard.maxLength({
        arg: Username.name,
        value: props.value,
        length: MAX_USERNAME_LENGTH,
      }),
    ];

    const guardResult = Result.combine(...valueGuards);

    if (!guardResult.success) return guardResult as Result<Username>;

    const username = new Username(props);

    return Result.ok(username);
  }
}
