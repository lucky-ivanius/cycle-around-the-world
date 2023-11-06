import { ValueObject } from '../../common/domain/value-object';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';

export interface NameProps {
  value: string;
}

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;

export class Name implements ValueObject<NameProps> {
  get value() {
    return this.props.value;
  }

  get slug() {
    return this.props.value
      .toLowerCase() // Convert the name to lowercase
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]/g, '') // Remove non-word characters except hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim(); // Trim any leading or trailing hyphens
  }

  private constructor(private readonly props: NameProps) {
    Object.freeze(this);
  }

  public static create(props: NameProps): Result<Name> {
    const valueGuards = [
      Guard.required({ arg: Name.name, value: props.value }),
      Guard.minLength({
        arg: Name.name,
        value: props.value,
        length: MIN_NAME_LENGTH,
      }),
      Guard.maxLength({
        arg: Name.name,
        value: props.value,
        length: MAX_NAME_LENGTH,
      }),
    ];

    const guardResult = Result.combine(...valueGuards);

    if (!guardResult.success) return guardResult as Result<Name>;

    const name = new Name(props);

    return Result.ok(name);
  }
}
