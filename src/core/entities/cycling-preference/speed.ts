import { ValueObject } from '../../common/domain/value-object';
import { Guard } from '../../common/logic/guard';
import { Result } from '../../common/logic/result';

export interface SpeedProps {
  value: number;
}

const MIN_SPEED_VALUE = 0;

export class Speed implements ValueObject<SpeedProps> {
  get value() {
    return this.props.value;
  }

  private constructor(private readonly props: SpeedProps) {}

  public static create(props: SpeedProps): Result<Speed> {
    const propsGuards = [
      Guard.required({ arg: 'Cycling Speed (km/h)', value: props.value }),
      Guard.greaterThanOrEqual({
        arg: 'Cycling Speed (km/h)',
        value: props.value,
        compareTo: MIN_SPEED_VALUE,
      }),
    ];

    const guardResult = Result.combine(...propsGuards);

    if (!guardResult.success) return guardResult as Result<Speed>;

    const speed = new Speed(props);

    return Result.ok(speed);
  }
}
