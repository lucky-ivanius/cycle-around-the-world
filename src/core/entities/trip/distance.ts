import { ValueObject } from '../../common/domain/value-object';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';

export interface DistanceProps {
  value: number;
}

export class Distance implements ValueObject<DistanceProps> {
  get value() {
    return this.props.value;
  }

  private constructor(private readonly props: DistanceProps) {}

  public static create(props: DistanceProps): Result<Distance> {
    const propsGuards = [
      Guard.required({ arg: Distance.name, value: props.value }),
    ];

    const guardResult = Result.combine(...propsGuards);

    if (!guardResult.success) return guardResult as Result<Distance>;

    const distance = new Distance(props);

    return Result.ok(distance);
  }
}
